// import { CreateBookDto, UpdateBookDto } from '../../dto/book.dto';
import { BookModel, IBook } from '../model';

export class InventoryRepository {
    async getLibraryInventriesByLibraryId(libraryId: string): Promise<IBook[]> {
        const books: IBook[] | [] = await BookModel.find({libraryId});
        return books;
    }

   

    async getInventoryItemById(libraryId: string, bookId: string): Promise<IBook | null> {
        const book: IBook | null = await BookModel.findOne({ libraryId, _id: bookId });
        return book;
    }

    async deleteLibraryInventryItem(libraryId: string, bookId: string): Promise<IBook | null> {
        const deletedBook = await BookModel.findOneAndUpdate({libraryId, _id: bookId}, { isDeleted: true, numberOfCopies: 0 }, { new: true });
        return deletedBook;
    }
}
