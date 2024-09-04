import { IBook, IBorrow, IInventory, ILibrary } from '../database/model';
import { BookRepository, InventoryRepository, LibraryRepository } from '../database/repository';
import { BorrowBookDto } from '../dto/borrow.dto';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { BadRequestError, NotFoundError } from '../errors';
import { INVENTRY_ITEM_DECREMENT_COUNT, INVENTRY_ITEM_INCREMENT_COUNT } from '../utils/constants';
import { BorrowRepository } from '../database/repository/borrow.repository';

const libraryRepository = new LibraryRepository();
const inventoryRepository = new InventoryRepository();
const borrowRepository = new BorrowRepository();
const bookRepository = new BookRepository();

export class LibraryService {
    public async getAllLibraries(): Promise<ILibrary[] | []> {
        const libraries: ILibrary[] | [] = await libraryRepository.findAllLibraries();
        return libraries;
    }

    public async getAllDetailsOfLibrary(
        libraryId: string,
    ): Promise<{ library: ILibrary | null; libraryBooksDetails: IBorrow[] | null }> {
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('This is a deleted Library');

        const libraryBooksDetails: IBorrow[] | null = await borrowRepository.findByLibraryId(libraryId);

        return { library, libraryBooksDetails };
    }

    public async getAllDetailsOfALibraryBook(
        libraryId: string,
        bookId: string,
    ): Promise<{ library: ILibrary; book: IBook | null; borrowersOfBook: IBorrow[] | null }> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('This is a deleted Library');

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
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('Library already deleted');
        const updatedLibrary: ILibrary | null = await libraryRepository.updateLibrary(
            libraryId,
            updateLibraryDto,
        );
        return updatedLibrary;
    }

    public async deleteLibrary(libraryId: string): Promise<ILibrary | null> {
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('Library already deleted');
        const deletedLibrary: ILibrary | null = await libraryRepository.deleteLibrary(libraryId);
        return deletedLibrary;
    }

    public async borrowBook(borrowBookDto: BorrowBookDto, userId: string): Promise<IBorrow | null> {
        const { bookId, libraryId } = borrowBookDto;
        // We can also use transaction here for consistency since we are doing 2 update operation in inventory and borrow

        // Check if the book exists in the library
        const bookItem: IInventory | null = await inventoryRepository.getInventoryItemByIds(
            libraryId,
            bookId,
        );
        if (!bookItem) throw new NotFoundError('Book not found In this Library');
        if (bookItem.isDeleted) throw new NotFoundError('Book is not available to borrow now');

        // Check if there are enough copies available
        if (bookItem.numberOfCopies <= 0) throw new BadRequestError('No copies available for borrowing');

        // Update the inventory to reduce the number of available copies
        await inventoryRepository.updateInventoryItemCount(libraryId, bookId, INVENTRY_ITEM_DECREMENT_COUNT);

        // Create a new borrow record
        const borrowedBook: IBorrow | null = await borrowRepository.borrowBook(libraryId, bookId, userId);

        return borrowedBook;
    }

    public async returnBook(libraryId: string, bookId: string, borrowerId: string): Promise<IBorrow | null> {
        // We can also use transaction here for consistency since we are doing 2 update operation in inventory and borrow
        const bookReturned: IBorrow | null = await borrowRepository.returnBook(libraryId, bookId, borrowerId);

        if (!bookReturned) throw new NotFoundError('Your borrow record is not found');

        const updatedInventory: IInventory | null = await inventoryRepository.updateInventoryItemCount(
            libraryId,
            bookId,
            INVENTRY_ITEM_INCREMENT_COUNT,
        );

        if (!updatedInventory) throw new NotFoundError('Inventory item not found');

        return bookReturned;
    }
}
