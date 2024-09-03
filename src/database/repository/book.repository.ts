import { CreateBookDto, UpdateBookDto } from '../../dto/book.dto';
import { BookModel, IBook } from '../model';

export class BookRepository {
    async createBook(bookData: CreateBookDto, autherId: string): Promise<IBook> {
        const book = await BookModel.create({ ...bookData, autherId });
        return book;
    }

    async findAllBooks(): Promise<IBook[] | []> {
        const books = await BookModel.find();
        return books;
    }

    async findById(bookId: string): Promise<IBook | null> {
        const book = await BookModel.findById(bookId);
        return book;
    }

    async findByTitle(title: string): Promise<IBook | null> {
        const book = await BookModel.findOne({ title });
        return book;
    }

    async updateBook(bookId: string, bookUpdateData?: Partial<UpdateBookDto>): Promise<IBook | null> {
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, bookUpdateData, { new: true });
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<IBook | null> {
        const deletedBook = await BookModel.findByIdAndUpdate(bookId, { isDeleted: true }, { new: true });
        return deletedBook;
    }
}
