import { Request, Response } from 'express';
import { LibraryService } from '../services';
import { IBook, ILibrary } from '../database/model';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { InventoryService } from '../services/inventory.service';

const libraryService = new LibraryService();
const inventoryService = new InventoryService();

// router.get('/:id/inventory', libraryController.getLibraryInventryById);
// // router.post('/:id/inventory', libraryController.getLibraryById);
// router.delete('/:id/inventory/:bookId ', libraryController.removeFromInventory);

const getLibraryInventriesByLibraryId = async (req: Request, res: Response): Promise<void> => {
    const{libraryId } = req.params
    const libraryInventories: IBook[] | [] = await inventoryService.getLibraryInventriesByLibraryId(libraryId);
    res.status(200).json(libraryInventories);
};

const getInventoryItemById = async (req: Request, res: Response): Promise<void> => {
    const { libraryId, bookId } = req.params;
    const item: IBook = await inventoryService.getInventoryItemById(libraryId, bookId);
    
    res.status(200).json(item);
};

const deleteLibraryInventryItem = async (req: Request, res: Response): Promise<void> => {
    const { libraryId, bookId } = req.params;
    const inventoryItem: IBook | null = await inventoryService.deleteLibraryInventryItem(libraryId, bookId );
    res.status(200).json(inventoryItem);
};

export default { getLibraryInventriesByLibraryId, getInventoryItemById, deleteLibraryInventryItem };
