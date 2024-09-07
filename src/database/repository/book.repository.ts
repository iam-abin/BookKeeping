import { ClientSession } from 'mongoose';
import { CreateBookDto, UpdateBookDto } from '../../dto/book.dto';
import { BookModel, IBook } from '../model';

export class BookRepository {
    async findAllBooks(): Promise<IBook[] | []> {
        const books = await BookModel.find().populate('authorId');
        return books;
    }

    async findById(bookId: string): Promise<IBook | null> {
        const book = await BookModel.findById(bookId)
            .populate({
                path: 'authorId',
                select: '-password', // Ensures password is not included
            })
            .lean();
        return book;
    }

    async createBook(bookData: CreateBookDto, session?: ClientSession): Promise<IBook> {
        const book = await BookModel.create([{ ...bookData }], { session });
        return book[0];
    }

    async findByTitle(title: string): Promise<IBook | null> {
        const book = await BookModel.findOne({ title });
        return book;
    }

    async updateBook(bookId: string, bookUpdateData?: Partial<UpdateBookDto>): Promise<IBook | null> {
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, { ...bookUpdateData }, { new: true });
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<IBook | null> {
        // soft delete book
        const deletedBook = await BookModel.findByIdAndUpdate(bookId, { isDeleted: true }, { new: true });
        return deletedBook;
    }
}
