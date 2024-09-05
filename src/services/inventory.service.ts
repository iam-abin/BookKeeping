import { IBook, IInventory } from '../database/model';
import { BookRepository } from '../database/repository';
import { InventoryRepository } from '../database/repository/inventory.repository';
import { BadRequestError, NotFoundError } from '../errors';

const inventoryRepository = new InventoryRepository();
const bookRepository = new BookRepository();

export class InventoryService {
    public async getInventoryByLibraryId(libraryId: string): Promise<IInventory[] | []> {
        const inventories: IInventory[] | [] = await inventoryRepository.getInventoryByLibraryId(libraryId);
        return inventories;
    }

    public async getInventoryItemById(libraryId: string, bookId: string): Promise<IInventory> {
        const book: IInventory | null = await inventoryRepository.getInventoryItemByIds(libraryId, bookId);
        if (!book) throw new NotFoundError('Book is not available In this Library');
        return book;
    }

    public async addBookToInventory(
        libraryId: string,
        bookId: string,
        numberOfCopies: number,
    ): Promise<IInventory | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('This book does not exist');

        // Here the book is deleted means It is not available in the market.
        if (book.isDeleted) throw new BadRequestError('Book not available currently');

        const isBookInInventory: IInventory | null = await inventoryRepository.getInventoryItemByIds(
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

        inventoryBook = await inventoryRepository.addBookToInventory(libraryId, bookId, numberOfCopies);
        return inventoryBook;
    }

    // If we delete a book from inventory which means it no longer be available for borrowing
    public async deleteInventoryItem(libraryId: string, bookId: string): Promise<IInventory | null> {
        const book: IInventory | null = await inventoryRepository.deleteInventoryItem(libraryId, bookId);
        return book;
    }
}
