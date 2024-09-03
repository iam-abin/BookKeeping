import mongoose from 'mongoose';
import { IBorrow, IInventory, ILibrary } from '../database/model';
import { InventoryRepository, LibraryRepository } from '../database/repository';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { BadRequestError, NotFoundError } from '../errors';
import { INVENTRY_ITEM_DECREMENT_COUNT, INVENTRY_ITEM_INCREMENT_COUNT } from '../utils/constants';
import { BorrowRepository } from '../database/repository/borrow.repository';

const libraryRepository = new LibraryRepository();
const inventoryRepository = new InventoryRepository();
const borrowRepository = new BorrowRepository();

export class LibraryService {
    public async getAllLibraries(): Promise<ILibrary[] | []> {
        const libraries: ILibrary[] | [] = await libraryRepository.findAllLibraries();
        return libraries;
    }

    public async getLibraryById(libraryId: string): Promise<ILibrary> {
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        return library;
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
        const library: ILibrary | null = await libraryRepository.updateLibrary(libraryId, updateLibraryDto);
        return library;
    }

    public async deleteLibrary(libraryId: string): Promise<ILibrary | null> {
        const library: ILibrary | null = await libraryRepository.deleteLibrary(libraryId);
        return library;
    }

    public async borrowBook(borrowBookDto: BorrowBookDto, userId: string): Promise<IBorrow | null> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { bookId, libraryId } = borrowBookDto;

            // Check if the book exists in the library
            const bookItem: IInventory | null = await inventoryRepository.getInventoryItemByIds(
                libraryId,
                bookId,
            );
            if (!bookItem) throw new NotFoundError('Book Items not found In this Library');

            // Check if there are enough copies available
            if (bookItem.numberOfCopies <= 0) throw new BadRequestError('No copies available for borrowing');

            // Update the inventory to reduce the number of available copies
            await inventoryRepository.updateInventoryItemCount(
                libraryId,
                bookId,
                INVENTRY_ITEM_DECREMENT_COUNT,
                session, // Pass the session
            );
            // Create a new borrow record
            const borrowedBook: IBorrow | null = await borrowRepository.borrowBook(
                libraryId,
                bookId,
                userId,
                session, // Pass the session
            );

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return borrowedBook;
        } catch (error) {
            // If any error occurs, abort the transaction
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    public async returnBook(returnBookDto: ReturnBookDto, userId: string): Promise<IBorrow | null> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { bookId, libraryId } = returnBookDto;

            // Update the borrower record to mark the book as returned
            const updatedBorrow = await borrowRepository.returnBook(bookId, libraryId, userId, session);

            if (!updatedBorrow) throw new NotFoundError('Borrow record not found');

            // Update the inventory to increase the number of available copies
            const updatedInventory = await inventoryRepository.updateInventoryItemCount(
                libraryId,
                bookId,
                INVENTRY_ITEM_INCREMENT_COUNT,
                session,
            );

            if (!updatedInventory) throw new NotFoundError('Inventory item not found');

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return updatedBorrow;
        } catch (error) {
            // If any error occurs, abort the transaction
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
}
