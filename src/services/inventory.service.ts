import { IBook, ILibrary } from '../database/model';
import { LibraryRepository } from '../database/repository';
import { InventoryRepository } from '../database/repository/inventory.repository';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { NotFoundError } from '../errors';

const inventoryRepository = new InventoryRepository();

export class InventoryService {
    public async getLibraryInventriesByLibraryId(libraryId: string): Promise<IBook[] | []> {
        const inventories: IBook[] | [] = await inventoryRepository.getLibraryInventriesByLibraryId(libraryId);
        return inventories;
    }

    public async getInventoryItemById(libraryId: string, bookId: string): Promise<IBook> {
        const library: IBook | null = await inventoryRepository.getInventoryItemById(libraryId, bookId);
        if (!library) throw new NotFoundError('Library Items not found');
        return library;
    }
    
    public async deleteLibraryInventryItem(libraryId: string, bookId: string): Promise<IBook | null> {
        const library: IBook | null = await inventoryRepository.getInventoryItemById(libraryId, bookId);
        return library;
    }
}
