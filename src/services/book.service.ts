import { IBook } from '../database/model';
import { BookRepository } from '../database/repository';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';

const bookRepository = new BookRepository();

export class BookService {
    public async getAllBooks(): Promise<IBook[] | []> {
        const books: IBook[] | [] = await bookRepository.findAllBooks();
        return books;
    }

    public async getABookById(bookId: string): Promise<IBook> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');
        return book;
    }

    public async createBook(createBookDto: CreateBookDto, autherId: string): Promise<IBook> {
        const { title } = createBookDto;
        const book: IBook | null = await bookRepository.findByTitle(title);
        if (book) throw new BadRequestError('Book already exist');

        const createdBook: IBook = await bookRepository.createBook(createBookDto, autherId);
        return createdBook;
    }

    public async updateBook(
        bookId: string,
        authorId: string,
        updateBookDto: Partial<UpdateBookDto>,
    ): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');
        if (authorId !== book.authorId.toString()) throw new ForbiddenError('You cant modify others book');

        const updatedBook: IBook | null = await bookRepository.updateBook(bookId, updateBookDto);
        if (!updatedBook) throw new BadRequestError('This book does not exist');
        return updatedBook;
    }

    public async deleteBook(bookId: string, authorId: string): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');
        if (authorId !== book.authorId.toString()) throw new ForbiddenError('You cant delete others book');

        const deletedBook: IBook | null = await bookRepository.deleteBook(bookId);
        return deletedBook;
    }
}
