import { Request, Response } from 'express';
import { IInventory } from '../database/model';
import { InventoryService } from '../services/inventory.service';
import { AddBookToInvertoryDto } from '../dto/inventory.dto';

const inventoryService = new InventoryService();

const listBooksInLibrary = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const libraryInventories: IInventory[] | [] = await inventoryService.getInventoryByLibraryId(id);
    res.status(200).json(libraryInventories);
};

const getInventoryItemById = async (req: Request, res: Response): Promise<void> => {
    const { libraryId, bookId } = req.params;
    const item: IInventory = await inventoryService.getInventoryItemById(libraryId, bookId);

    res.status(200).json(item);
};

const addBookToInventory = async (req: Request, res: Response): Promise<void> => {
    const { id: libraryId } = req.params;
    const { bookId, numberOfCopies } = req.body as AddBookToInvertoryDto;
    const item: IInventory | null = await inventoryService.addBookToInventory(
        libraryId,
        bookId,
        numberOfCopies,
    );

    res.status(200).json(item);
};

const removeBookFromInventory = async (req: Request, res: Response): Promise<void> => {
    const { id, bookId } = req.params;

    const inventoryItem: IInventory | null = await inventoryService.deleteInventoryItem(id, bookId);
    res.status(200).json(inventoryItem);
};

export default { listBooksInLibrary, getInventoryItemById, addBookToInventory, removeBookFromInventory };
