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
        if (!book) throw new NotFoundError('This book does not exist');
        return book;
    }

    public async createBook(
        createBookDto: CreateBookDto,
        authorId: string,
        imageFile: Express.Multer.File,
    ): Promise<IBook> {
        if (!imageFile) throw new BadRequestError('Should add a coverImage');

        const { title } = createBookDto;
        const book: IBook | null = await bookRepository.findByTitle(title);
        if (book) throw new BadRequestError('Book already exist');

        const imageUrl: string = await uploadImage(imageFile, authorId);
        createBookDto.coverImageUrl = imageUrl;
        createBookDto.authorId = authorId;
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
        if (!book) throw new NotFoundError('This book does not exist');

        if (authorId != (book.authorId as IUser)._id) throw new ForbiddenError('You cant modify others book');

        if (imageFile) {
            const imageUrl: string = await uploadImage(imageFile, authorId);
            updateBookDto.coverImageUrl = imageUrl;
        }
        // Remove fields with empty values 'eg: if we do not add title and when updating, it will be like title: "". '
        const filteredUpdateDto = Object.fromEntries(
            Object.entries(updateBookDto).filter(([_, value]) => value),
        );

        const updatedBook: IBook | null = await bookRepository.updateBook(bookId, filteredUpdateDto);
        if (!updatedBook) throw new BadRequestError('This book does not exist');
        return updatedBook;
    }

    public async deleteBook(bookId: string, authorId: string): Promise<IBook | null> {
        const book: IBook | null = await bookRepository.findById(bookId);
        if (!book) throw new NotFoundError('This book does not exist');

        if (authorId != (book.authorId as IUser)._id) throw new ForbiddenError('You cant delete others book');

        const deletedBook: IBook | null = await bookRepository.deleteBook(bookId);
        return deletedBook;
    }
}
