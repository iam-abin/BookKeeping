import { Request, Response } from 'express';
import { LibraryService } from '../services';
import { IBook } from '../database/model';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';

const libraryService = new LibraryService();

const getAllLibraries = async (req: Request, res: Response): Promise<void> => {
    const books: IBook[] | [] = await libraryService.getAllLibraries();
    res.status(200).json(books);
};

const getLibraryById = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const user: IBook = await libraryService.getLibraryById(bookId);
    res.status(200).json(user);
};

const createLibrary = async (req: Request, res: Response): Promise<void> => {
    const user: IBook = await libraryService.createLibrary(req.body as CreateLibraryDto);
    res.status(201).json(user);
};

const updateLibrary = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const book: IBook | null = await libraryService.updateLibrary(bookId, req.body as UpdateLibraryDto);
    res.status(200).json(book);
};

const deleteLibrary = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const book: IBook | null = await libraryService.deleteLibrary(bookId);
    res.status(200).json(book);
};

export default { getAllLibraries, getLibraryById, createLibrary, updateLibrary, deleteLibrary };
