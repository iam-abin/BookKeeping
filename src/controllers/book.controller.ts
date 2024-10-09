import { Request, Response } from 'express';
import { bookService } from '../services';
import { IBook } from '../database/model';
import { BookDto } from '../dto/book.dto';
import transformSuccessResponse from '../utils/response';

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const books: IBook[] | [] = await bookService.getAllBooks();
    res.status(200).json(transformSuccessResponse('All the Books are', { books }));
};

const getABook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const book: IBook | null = await bookService.getABookById(id);
    res.status(200).json(transformSuccessResponse('Requested book is', { book }));
};

const createBook = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const book: IBook | null = await bookService.createBook(req.body as BookDto, userId, req.file!);
    res.status(201).json(transformSuccessResponse('Book created successfully', { book }));
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId } = req.user!;
    const book: IBook | null = await bookService.updateBook(
        id,
        userId,
        req.body as Partial<BookDto>,
        req.file!,
    );
    res.status(200).json(transformSuccessResponse('Book updated successfully', { book }));
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId } = req.user!;
    const book: IBook | null = await bookService.deleteBook(id, userId);
    res.status(200).json(transformSuccessResponse('Book deleted successfully', { book }));
};

export default { getAllBooks, getABook, createBook, updateBook, deleteBook };
