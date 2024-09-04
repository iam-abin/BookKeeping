import { IInventory } from '../database/model';
import { InventoryRepository } from '../database/repository/inventory.repository';
import { NotFoundError } from '../errors';

const inventoryRepository = new InventoryRepository();

export class InventoryService {
    public async getInventoryByLibraryId(libraryId: string): Promise<IInventory[] | []> {
        const inventories: IInventory[] | [] = await inventoryRepository.getInventoryByLibraryId(libraryId);
        return inventories;
    }

    public async getInventoryItemById(libraryId: string, bookId: string): Promise<IInventory> {
        const book: IInventory | null = await inventoryRepository.getInventoryItemByIds(libraryId, bookId);
        if (!book) throw new NotFoundError('Book Items not found In this Library');
        return book;
    }

    public async addBookToInventory(
        libraryId: string,
        bookId: string,
        numberOfCopies: number,
    ): Promise<IInventory | null> {
        const inventoryBook: IInventory | null = await inventoryRepository.getInventoryItemByIds(
            libraryId,
            bookId,
        );

        let book: IInventory | null;
        if (inventoryBook) {
            console.log('inventoryBook is ', inventoryBook);

            // It will enable item if it is already deleted
            book = await inventoryRepository.updateInventoryItemCount(libraryId, bookId, numberOfCopies);
            return book;
        }

        book = await inventoryRepository.addBookToInventory(libraryId, bookId, numberOfCopies);
        return book;
    }

    public async deleteInventoryItem(libraryId: string, bookId: string): Promise<IInventory | null> {
        const book: IInventory | null = await inventoryRepository.deleteInventoryItem(libraryId, bookId);
        return book;
    }
}
