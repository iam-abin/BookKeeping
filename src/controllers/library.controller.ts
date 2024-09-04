import { Request, Response } from 'express';
import { LibraryService } from '../services';
import { IBook, IBorrow, ILibrary } from '../database/model';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';

const libraryService = new LibraryService();

const listAllLibraries = async (req: Request, res: Response): Promise<void> => {
    const libraries: ILibrary[] | [] = await libraryService.getAllLibraries();
    res.status(200).json(libraries);
};

const getLibraryDetailsById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const library: { library: ILibrary | null; libraryBooksDetails: IBorrow[] | null } =
        await libraryService.getAllDetailsOfLibrary(id);
    res.status(200).json(library);
};

const getALibraryBookDetails = async (req: Request, res: Response): Promise<void> => {
    const { id, libraryId } = req.params;
    const book: { library: ILibrary; book: IBook | null; borrowersOfBook: IBorrow[] | null } =
        await libraryService.getAllDetailsOfALibraryBook(libraryId, id);
    res.status(200).json(book);
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
    const book: IBorrow | null = await libraryService.borrowBook(req.body as BorrowBookDto, userId);
    res.status(200).json(book);
};

const returnBook = async (req: Request, res: Response): Promise<void> => {
    const { id: bookId } = req.params;
    const { userId } = req.user!;
    const { libraryId } = req.body as unknown as ReturnBookDto;
    const book: IBorrow | null = await libraryService.returnBook(libraryId, bookId, userId);
    res.status(200).json(book);
};

export default {
    listAllLibraries,
    getLibraryDetailsById,
    getALibraryBookDetails,
    createLibrary,
    updateLibrary,
    deleteLibrary,
    borrowBook,
    returnBook,
};
