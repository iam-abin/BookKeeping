import { Request, Response } from 'express';
import { libraryService } from '../services';
import { IBook, IBorrow, IInventory, ILibrary } from '../database/model';
import { LibraryDto } from '../dto/library.dto';
import { BorrowBookDto, ReturnBookDto } from '../dto/borrow.dto';
import transformSuccessResponse from '../utils/response';

export interface ILibraryDetails {
    library: ILibrary | null;
    libraryBooksDetails: IBorrow[] | null;
}

export interface ILibraryBookDetails {
    library: ILibrary;
    book: IBook | null;
    borrowersOfBook: IBorrow[] | null;
}

export interface ILibraryDetailsResponse {
    library: ILibrary;
    libraryBooksDetails: IInventory[];
}

const listAllLibraries = async (req: Request, res: Response): Promise<void> => {
    const libraries: ILibrary[] | [] = await libraryService.getAllLibraries();
    res.status(200).json(transformSuccessResponse('All available libraries are', { libraries }));
};

const getLibraryDetailsById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const libraryDetails: ILibraryDetailsResponse = await libraryService.getAllDetailsOfLibrary(id);
    res.status(200).json(transformSuccessResponse('Library details are', { libraryDetails }));
};

const getALibraryBookDetails = async (req: Request, res: Response): Promise<void> => {
    const { id, libraryId } = req.params;
    const bookDetails: ILibraryBookDetails = await libraryService.getAllDetailsOfALibraryBook(libraryId, id);
    res.status(200).json(transformSuccessResponse('Library book details are', { bookDetails }));
};

const createLibrary = async (req: Request, res: Response): Promise<void> => {
    const library: ILibrary = await libraryService.createLibrary(req.body as LibraryDto);
    res.status(201).json(transformSuccessResponse('Library created successfully', { library }));
};

const updateLibrary = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedLibrary: ILibrary | null = await libraryService.updateLibrary(
        id,
        req.body as Partial<LibraryDto>,
    );
    res.status(200).json(transformSuccessResponse('Library updated successfully', { updatedLibrary }));
};

const deleteLibrary = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedLibrary: ILibrary | null = await libraryService.deleteLibrary(id);
    res.status(200).json(transformSuccessResponse('Library deleted successfully', { deletedLibrary }));
};

const borrowBook = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const book: IBorrow | null = await libraryService.borrowBook(req.body as BorrowBookDto, userId);
    res.status(200).json(transformSuccessResponse('Book borrowed', { book }));
};

const returnBook = async (req: Request, res: Response): Promise<void> => {
    const { id: bookId } = req.params;
    const { userId } = req.user!;
    const { libraryId } = req.body as unknown as ReturnBookDto;
    const book: IBorrow | null = await libraryService.returnBook(libraryId, bookId, userId);
    res.status(200).json(transformSuccessResponse('Book returned', { book }));
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
