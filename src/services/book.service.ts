import { IBook, ILibrary } from '../database/model';
import { BookRepository, LibraryRepository } from '../database/repository';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { NotFoundError } from '../errors';

const bookRepository = new BookRepository();
const libraryRepository = new LibraryRepository();


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

    public async createBook(createBookDto: CreateBookDto): Promise<IBook> {
        const {libraryId} = createBookDto
        const library: ILibrary | null = await libraryRepository.findById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
     
        const book: IBook = await bookRepository.createBook(createBookDto);
        return book;
    }

    public async updateBook(bookId: string, updateBookDto: Partial<UpdateBookDto>): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.updateBook(bookId, updateBookDto);
        return book;
    }

    public async deleteBook(bookId: string): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.deleteBook(bookId);
        return book;
    }
}
