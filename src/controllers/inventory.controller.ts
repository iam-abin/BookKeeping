import { Request, Response } from 'express';
import { IInventory } from '../database/model';
import { inventoryService } from '../services/inventory.service';
import { AddBookToInvertoryDto } from '../dto/inventory.dto';
import { NotFoundError } from '../errors';
import transformSuccessResponse from '../utils/response';

const listBooksInLibrary = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const libraryInventories: IInventory[] | [] = await inventoryService.getInventoryByLibraryId(id);
    res.status(200).json(transformSuccessResponse('Library books are', { libraryInventories }));
};

// const getABookInLibrary = async (req: Request, res: Response): Promise<void> => {
//     const { id, bookId } = req.params;

//     const libraryInventories: IInventory | [] = await inventoryService.getABookFromInventory(id);
//     res.status(200).json(libraryInventories);
// };

const getInventoryItemById = async (req: Request, res: Response): Promise<void> => {
    const { id: libraryId, bookId } = req.params;
    const item: IInventory | null = await inventoryService.getInventoryItemById(libraryId, bookId);
    if (!item) throw new NotFoundError('This book is not available In this Library');
    res.status(200).json(item);
};

const addBookToInventory = async (req: Request, res: Response): Promise<void> => {
    const { id: libraryId } = req.params;
    const { bookId, charge, numberOfCopies } = req.body as AddBookToInvertoryDto;
    const item: IInventory | null = await inventoryService.addBookToInventory(
        libraryId,
        bookId,
        charge,
        numberOfCopies,
    );

    res.status(200).json(transformSuccessResponse('Book added to inventory successfully', { item }));
};

const removeBookFromInventory = async (req: Request, res: Response): Promise<void> => {
    const { id, bookId } = req.params;
    const inventoryItem: IInventory | null = await inventoryService.deleteInventoryItem(id, bookId);
    res.status(200).json(
        transformSuccessResponse('Book removed from inventory successfully', { inventoryItem }),
    );
};

export default { listBooksInLibrary, getInventoryItemById, addBookToInventory, removeBookFromInventory };
