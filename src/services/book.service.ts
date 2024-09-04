import { IBook, IUser } from '../database/model';
import { BookRepository } from '../database/repository';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors';
import { uploadImage } from '../utils/fileUpload';

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

    public async createBook(
        createBookDto: CreateBookDto,
        authorId: string,
        imageFile: Express.Multer.File,
    ): Promise<IBook> {
        const { title } = createBookDto;
        if (!imageFile) throw new BadRequestError('Should add a coverImage');

        const book: IBook | null = await bookRepository.findByTitle(title);
        if (book) throw new BadRequestError('Book already exist');

        const imageUrl: string = await uploadImage(imageFile, authorId);
        createBookDto.coverImageUrl = imageUrl;
        createBookDto.coverImageUrl = authorId;
        const createdBook: IBook = await bookRepository.createBook(createBookDto);
        return createdBook;
    }

    public async updateBook(
        bookId: string,
        authorId: string,
        updateBookDto: Partial<UpdateBookDto>,
        imageFile: Express.Multer.File,
    ): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');

        if (authorId != (book.authorId as IUser)._id) throw new ForbiddenError('You cant modify others book');

        if (imageFile) {
            const imageUrl: string = await uploadImage(imageFile, authorId);
            updateBookDto.coverImageUrl = imageUrl;
        }
        const updatedBook: IBook | null = await bookRepository.updateBook(bookId, updateBookDto);
        if (!updatedBook) throw new BadRequestError('This book does not exist');
        return updatedBook;
    }

    public async deleteBook(bookId: string, authorId: string): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('Book not found');

        console.log('book.authorId.toString()', book.authorId.toString());
        console.log('(book.authorId as IUser)._id', (book.authorId as IUser)._id);
        console.log('authorId ', authorId);
        console.log('authorId != book.authorId.toString()', authorId != (book.authorId as IUser)._id);
        console.log('authorId !== book.authorId.toString()', authorId !== (book.authorId as IUser)._id);

        if (authorId != (book.authorId as IUser)._id) throw new ForbiddenError('You cant delete others book');

        const deletedBook: IBook | null = await bookRepository.deleteBook(bookId);
        return deletedBook;
    }
}
