// import { CreateBookDto, UpdateBookDto } from '../../dto/book.dto';
import mongoose from 'mongoose';
import { InventoryModel, IInventory } from '../model';

export class InventoryRepository {
    async getLibraryInventoriesByLibraryId(libraryId: string): Promise<IInventory[]> {
        const books: IInventory[] | [] = await InventoryModel.find({ libraryId });
        return books;
    }

    async getInventoryItemByIds(libraryId: string, bookId: string): Promise<IInventory | null> {
        const book: IInventory | null = await InventoryModel.findOne({ libraryId, _id: bookId });
        return book;
    }

    async addBookToInventory(
        libraryId: string,
        bookId: string,
        numberOfCopies: number,
    ): Promise<IInventory | null> {
        const book: IInventory | null = await InventoryModel.create({ libraryId, bookId, numberOfCopies });
        return book;
    }

    async deleteLibrarysInventoryItem(libraryId: string, bookId: string): Promise<IInventory | null> {
        const deletedBook: IInventory | null = await InventoryModel.findOneAndUpdate(
            { libraryId, _id: bookId },
            { isDeleted: true, numberOfCopies: 0 },
            { new: true },
        );
        return deletedBook;
    }

    // To update an inventory item count of a library
    async updateInventoryItemCount(
        libraryId: string,
        bookId: string,
        updateCount: number,
        session?: mongoose.ClientSession,
    ): Promise<IInventory | null> {
        const updateOptions: { new: boolean; session?: mongoose.ClientSession } = { new: true };

        // Include session only if it's provided
        if (session) {
            updateOptions.session = session;
        }

        const inventoryItem: IInventory | null = await InventoryModel.findOneAndUpdate(
            { libraryId, _id: bookId },
            { $inc: { numberOfCopies: updateCount } },
            updateOptions,
        ).exec(); // Use exec() to return a proper promise;
        return inventoryItem;
    }

    // async returnBook(libraryId: string, bookId: string, userId: string): Promise<IBorrow | null> {
    //     const returned: IBorrow | null = await BorrowModel.findOneAndUpdate(
    //         { libraryId, _id: bookId },
    //         { isDeleted: true, numberOfCopies: 0 },
    //         { new: true },
    //     );
    //     return returned;
    // }
}
