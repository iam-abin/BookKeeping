import { Request, Response } from 'express';
import { BookService } from '../services';
import { IBook } from '../database/model';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';

const bookService = new BookService();

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const books: IBook[] | [] = await bookService.getAllBooks();
    res.status(200).json(books);
};

const getABook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const book: IBook = await bookService.getABookById(id);
    res.status(200).json(book);
};

const createBook = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const book: IBook = await bookService.createBook(req.body as CreateBookDto, userId);
    res.status(201).json(book);
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId } = req.user!;
    const book: IBook | null = await bookService.updateBook(id, userId, req.body as Partial<UpdateBookDto>);
    res.status(200).json(book);
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId } = req.user!;
    const book: IBook | null = await bookService.deleteBook(id, userId);
    res.status(200).json(book);
};

export default { getAllBooks, getABook, createBook, updateBook, deleteBook };
