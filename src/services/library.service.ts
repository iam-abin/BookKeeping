import { IBook, IBorrow, IInventory, ILibrary } from '../database/model';
import {
    BookRepository,
    BorrowRepository,
    InventoryRepository,
    LibraryRepository,
    PaymentRepository,
} from '../database/repository';
import { BorrowBookDto } from '../dto/borrow.dto';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { BadRequestError, NotFoundError } from '../errors';
import { INVENTRY_ITEM_DECREMENT_COUNT, INVENTRY_ITEM_INCREMENT_COUNT } from '../utils/constants';
import { ILibraryDetailsResponse } from '../controllers/library.controller';
import mongoose, { ClientSession } from 'mongoose';

const libraryRepository = new LibraryRepository();
const inventoryRepository = new InventoryRepository();
const borrowRepository = new BorrowRepository();
const bookRepository = new BookRepository();
const paymentRepository = new PaymentRepository();

export class LibraryService {
    public async getAllLibraries(): Promise<ILibrary[] | []> {
        const libraries: ILibrary[] | [] = await libraryRepository.findAllLibraries();
        return libraries;
    }

    public async getAllDetailsOfLibrary(libraryId: string): Promise<ILibraryDetailsResponse> {
        const library: ILibrary = await this.ensureLibraryExists(libraryId);

        // const libraryBooksDetails: IBorrow[] | null = await borrowRepository.findByLibraryId(libraryId);
        const libraryBooksDetails: IInventory[] | [] =
            await inventoryRepository.findInventoryByLibraryId(libraryId);

        return { library, libraryBooksDetails };
    }

    public async getAllDetailsOfALibraryBook(
        libraryId: string,
        bookId: string,
    ): Promise<{ library: ILibrary; book: IBook | null; borrowersOfBook: IBorrow[] | null }> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');

        const library: ILibrary = await this.ensureLibraryExists(libraryId);

        const borrowersOfBook: IBorrow[] | null = await borrowRepository.findByLibraryAndBookId(
            libraryId,
            bookId,
        );

        return { library, book, borrowersOfBook };
    }

    public async createLibrary(createLibraryDto: CreateLibraryDto): Promise<ILibrary> {
        const { libraryName } = createLibraryDto;
        const library: ILibrary | null = await libraryRepository.findLibraryByName(libraryName);
        if (library) throw new BadRequestError('Library already exist!');
        const createdLibrary: ILibrary = await libraryRepository.createLibrary(createLibraryDto);
        return createdLibrary;
    }

    public async updateLibrary(
        libraryId: string,
        updateLibraryDto: Partial<UpdateLibraryDto>,
    ): Promise<ILibrary | null> {
        await this.ensureLibraryExists(libraryId);

        const updatedLibrary: ILibrary | null = await libraryRepository.updateLibrary(
            libraryId,
            updateLibraryDto,
        );
        return updatedLibrary;
    }

    public async deleteLibrary(libraryId: string): Promise<ILibrary | null> {
        await this.ensureLibraryExists(libraryId);

        const deletedLibrary: ILibrary | null = await libraryRepository.deleteLibrary(libraryId);
        return deletedLibrary;
    }

    public async borrowBook(borrowBookDto: BorrowBookDto, borrowerId: string): Promise<IBorrow | null> {
        const { bookId, libraryId } = borrowBookDto;

        // Start a session
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const alreadyBorrowedThisBook: IBorrow | null = await borrowRepository.findBorrowed(
                libraryId,
                bookId,
                borrowerId,
            );

            // A person can borrow only one book with same bookId from a library
            // If the book is not returned
            if (alreadyBorrowedThisBook && !alreadyBorrowedThisBook.isReturned)
                throw new BadRequestError('You already borrowed this book');

            // Ensure the book exists in the library
            const bookItem: IInventory | null = await inventoryRepository.findInventoryItemByIds(
                libraryId,
                bookId,
            );
            if (!bookItem) throw new NotFoundError('Book not found In this Library');
            if (bookItem.isDeleted) throw new NotFoundError('Book is not available to borrow now');
            // Check if there are enough copies available
            if (bookItem.numberOfCopies <= 0) throw new BadRequestError('No copies available for borrowing');

            // If you had been  once borrowed this book and returned back.
            if (alreadyBorrowedThisBook && alreadyBorrowedThisBook.isReturned) {
                // Update the return status to false to buy again
                const updatedReturnStatus: IBorrow | null = await borrowRepository.updateReturn(
                    libraryId,
                    bookId,
                    borrowerId,
                    session,
                );
                const CHARGE = bookItem?.charge;

                await this.handlePayment(alreadyBorrowedThisBook._id as string, borrowerId, CHARGE, session);
                // Update the inventory to reduce the number of available copies
                await this.updateInventoryCount(libraryId, bookId, INVENTRY_ITEM_DECREMENT_COUNT, session);

                // Commit the transaction
                await session.commitTransaction();
                return updatedReturnStatus;
            }

            // If going to borrow this book for the first time
            const borrowedBook: IBorrow | null = await borrowRepository.borrowBook(
                libraryId,
                bookId,
                borrowerId,
                session,
            );

            if (!borrowedBook) throw new BadRequestError('Borrowing failed');

            // Pay for the book. we can also implement a payment gatway
            const CHARGE = bookItem.charge;
            await this.handlePayment(borrowedBook._id as string, borrowerId, CHARGE, session);

            // Update the inventory to reduce the number of available copies
            await this.updateInventoryCount(libraryId, bookId, INVENTRY_ITEM_DECREMENT_COUNT, session);

            // Commit the transaction
            await session.commitTransaction();
            return borrowedBook;
        } catch (error) {
            // Rollback the transaction if something goes wrong
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    public async returnBook(libraryId: string, bookId: string, borrowerId: string): Promise<IBorrow | null> {
        // Start a session
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const alreadyBorrowedThisBook: IBorrow | null = await borrowRepository.findBorrowed(
                libraryId,
                bookId,
                borrowerId,
            );
            if (!alreadyBorrowedThisBook) throw new BadRequestError('You never borrowed this book');
            if (alreadyBorrowedThisBook.isReturned)
                throw new BadRequestError('You already returned this book');
            // We can also use transaction here for consistency since we are doing 2 update operation in inventory and borrow
            const bookReturned: IBorrow | null = await borrowRepository.updateReturn(
                libraryId,
                bookId,
                borrowerId,
                session,
            );

            if (!bookReturned) throw new NotFoundError('Your borrow record is not found');

            // Increment inventry item count
            await this.updateInventoryCount(libraryId, bookId, INVENTRY_ITEM_INCREMENT_COUNT, session);

            // Commit the transaction
            await session.commitTransaction();
            return bookReturned;
        } catch (error) {
            // Rollback the transaction if something goes wrong
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    // Helper functions for some common functionalities
    private async ensureLibraryExists(libraryId: string): Promise<ILibrary> {
        const library = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('This is a deleted Library');
        return library;
    }

    private async handlePayment(
        borrowId: string,
        borrowerId: string,
        amount: number,
        session?: ClientSession,
    ): Promise<void> {
        const payment = await paymentRepository.createPayment({ borrowerId, borrowId, amount }, session);
        if (!payment) throw new Error('payment failed');
        // return payment
    }

    private async updateInventoryCount(
        libraryId: string,
        bookId: string,
        updateCount: number,
        session?: ClientSession,
    ): Promise<IInventory | null> {
        const countUpdate = await inventoryRepository.updateInventoryItemCount(
            libraryId,
            bookId,
            updateCount,
            session,
        );
        if (!countUpdate) throw new Error('Item count update failed');
        return countUpdate;
    }
}
