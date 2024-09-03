import { IInventory } from '../database/model';
import { InventoryRepository } from '../database/repository/inventory.repository';
import { NotFoundError } from '../errors';

const inventoryRepository = new InventoryRepository();

export class InventoryService {
    public async getLibraryInventoriesByLibraryId(libraryId: string): Promise<IInventory[] | []> {
        const inventories: IInventory[] | [] =
            await inventoryRepository.getLibraryInventoriesByLibraryId(libraryId);
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
            book = await inventoryRepository.updateInventoryItemCount(libraryId, bookId, numberOfCopies);
            return book;
        }

        book = await inventoryRepository.addBookToInventory(libraryId, bookId, numberOfCopies);
        return book;
    }

    public async removeBookFromInventory(libraryId: string, bookId: string): Promise<IInventory | null> {
        const book: IInventory | null = await inventoryRepository.getInventoryItemByIds(libraryId, bookId);
        return book;
    }
}
