import { IBook, IInventory, ILibrary } from '../database/model';
import { BookRepository, LibraryRepository } from '../database/repository';
import { InventoryRepository } from '../database/repository/inventory.repository';
import { BadRequestError, NotFoundError } from '../errors';

const inventoryRepository = new InventoryRepository();
const bookRepository = new BookRepository();
const libraryRepository = new LibraryRepository();

export class InventoryService {
    public async getInventoryByLibraryId(libraryId: string): Promise<IInventory[] | []> {
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('Library already deleted');
        const inventories: IInventory[] | [] = await inventoryRepository.findInventoryByLibraryId(libraryId);
        return inventories;
    }

    public async getInventoryItemById(libraryId: string, bookId: string): Promise<IInventory | null> {
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('Library already deleted');
        const book: IInventory | null = await inventoryRepository.findInventoryItemByIds(libraryId, bookId);
        if (!book) throw new NotFoundError('No such book in this library');
        return book;
    }

    public async addBookToInventory(
        libraryId: string,
        bookId: string,
        charge: number,
        numberOfCopies: number,
    ): Promise<IInventory | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        // To check book is available in this world
        if (!book) throw new NotFoundError('This book does not exist');
        // Here the book is deleted means It is not available in the market.So cant add to library inventory.
        if (book.isDeleted) throw new BadRequestError('Book copies are not available currently');

        // To check the library exist
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('Library is deleted. Cannot add book');

        const isBookInInventory: IInventory | null = await inventoryRepository.findInventoryItemByIds(
            libraryId,
            bookId,
        );

        let inventoryBook: IInventory | null;
        if (isBookInInventory) {
            // It will enable item if it is already deleted
            inventoryBook = await inventoryRepository.updateInventoryItemCount(
                libraryId,
                bookId,
                numberOfCopies,
            );
            return inventoryBook;
        }

        inventoryBook = await inventoryRepository.addBookToInventory(
            libraryId,
            bookId,
            charge,
            numberOfCopies,
        );
        return inventoryBook;
    }

    // If we delete a book from inventory which means it no longer be available for borrowing
    public async deleteInventoryItem(libraryId: string, bookId: string): Promise<IInventory | null> {
        // To check the library exist
        const library: ILibrary | null = await libraryRepository.findLibraryById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        if (library.isDeleted) throw new BadRequestError('Library is deleted. Cannot access inventory item');

        const book: IInventory | null = await inventoryRepository.findInventoryItemByIds(libraryId, bookId);
        // To check book is available in the library
        if (!book) throw new NotFoundError('This book does not exist in this library');
        // Here the book is deleted means It is not available to borrow.
        if (book.isDeleted) throw new BadRequestError('Book book is deleted from library');

        const deletedBook: IInventory | null = await inventoryRepository.deleteInventoryItem(
            libraryId,
            bookId,
        );
        return deletedBook;
    }
}
