import { Request, Response } from 'express';
import { LibraryService } from '../services';
import { IBorrow, ILibrary } from '../database/model';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';

const libraryService = new LibraryService();

const listAllLibraries = async (req: Request, res: Response): Promise<void> => {
    const libraries: ILibrary[] | [] = await libraryService.getAllLibraries();
    res.status(200).json(libraries);
};

const getLibraryDetailsById = async (req: Request, res: Response): Promise<void> => {
    const { libraryId } = req.params;
    const library: ILibrary = await libraryService.getLibraryById(libraryId);
    res.status(200).json(library);
};

const createLibrary = async (req: Request, res: Response): Promise<void> => {
    const library: ILibrary = await libraryService.createLibrary(req.body as CreateLibraryDto);
    res.status(201).json(library);
};

const updateLibrary = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const library: ILibrary | null = await libraryService.updateLibrary(id, req.body as UpdateLibraryDto);
    res.status(200).json(library);
};

const deleteLibrary = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const library: ILibrary | null = await libraryService.deleteLibrary(id);
    res.status(200).json(library);
};

const borrowBook = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const book: IBorrow | null = await libraryService.borrowBook(
        req.params as unknown as BorrowBookDto,
        userId,
    );
    res.status(200).json(book);
};

const returnBook = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const book: IBorrow | null = await libraryService.borrowBook(
        req.params as unknown as ReturnBookDto,
        userId,
    );
    res.status(200).json(book);
};

export default {
    listAllLibraries,
    getLibraryDetailsById,
    createLibrary,
    updateLibrary,
    deleteLibrary,
    borrowBook,
    returnBook,
};
