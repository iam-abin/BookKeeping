import { Request, Response } from 'express';
import { BookService, LibraryService } from '../services';
import { IBook, ILibrary } from '../database/model';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';

const bookService = new BookService();
const libraryService = new LibraryService();

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const books: IBook[] | [] = await bookService.getAllBooks();
    res.status(200).json(books);
};

const getABook = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const book: IBook = await bookService.getABookById(bookId);
    res.status(200).json(book);
};

const createBook = async (req: Request, res: Response): Promise<void> => {
    const { libraryId } = req.params;
    const library: ILibrary = await libraryService.getLibraryById(libraryId);
    
    const book: IBook = await bookService.createBook(req.body as CreateBookDto);
    res.status(201).json(book);
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const book: IBook | null = await bookService.updateBook(bookId, req.body as UpdateBookDto);
    res.status(200).json(book);
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const book: IBook | null = await bookService.deleteBook(bookId);
    res.status(200).json(book);
};

export default { getAllBooks, getABook, createBook, updateBook, deleteBook };
