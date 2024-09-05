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

    async createBook(bookData: CreateBookDto): Promise<IBook> {
        const book = await BookModel.create(bookData);
        return book;
    }

    async findByTitle(title: string): Promise<IBook | null> {
        const book = await BookModel.findOne({ title });
        return book;
    }

    async updateBook(bookId: string, bookUpdateData?: Partial<UpdateBookDto>): Promise<IBook | null> {
        console.log(bookUpdateData);

        const updatedBook = await BookModel.findByIdAndUpdate(bookId, { ...bookUpdateData }, { new: true });
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<IBook | null> {
        // soft delete book
        const deletedBook = await BookModel.findByIdAndUpdate(bookId, { isDeleted: true }, { new: true });
        return deletedBook;
    }
}
