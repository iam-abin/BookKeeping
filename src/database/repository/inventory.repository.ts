import { ClientSession } from 'mongoose';
import { InventoryModel, IInventory } from '../model';

class InventoryRepository {
    async findInventoryByLibraryId(libraryId: string): Promise<IInventory[]> {
        const books: IInventory[] | [] = await InventoryModel.find({ libraryId })
            .populate('libraryId')
            .populate('bookId');
        return books;
    }

    async findInventoryItemByIds(libraryId: string, bookId: string): Promise<IInventory | null> {
        const book: IInventory | null = await InventoryModel.findOne({
            libraryId,
            bookId,
            isDeleted: false,
        });

        return book;
    }

    async addBookToInventory(
        libraryId: string,
        bookId: string,
        charge: number,
        numberOfCopies: number,
    ): Promise<IInventory | null> {
        const book: IInventory | null = await InventoryModel.create({
            libraryId,
            bookId,
            charge,
            numberOfCopies,
        });
        return book;
    }

    // To update an inventory item count of a library
    async updateInventoryItemCount(
        libraryId: string,
        bookId: string,
        updateCount: number,
        session?: ClientSession,
    ): Promise<IInventory | null> {
        const inventoryItem: IInventory | null = await InventoryModel.findOneAndUpdate(
            { libraryId, bookId },
            { $set: { isDeleted: false }, $inc: { numberOfCopies: updateCount } },
            { new: true, session },
        ).exec(); // Use exec() to return a proper promise;

        return inventoryItem;
    }

    async deleteInventoryItem(libraryId: string, bookId: string): Promise<IInventory | null> {
        // Soft delete book from inventory. Here numberOfCopies exists the same
        // This deleted book wont be available to sale.
        // Can be enabled in the future
        const deletedBook: IInventory | null = await InventoryModel.findOneAndUpdate(
            { libraryId, bookId },
            { isDeleted: true },
            { new: true },
        );
        return deletedBook;
    }
}

export const inventoryRepository = new InventoryRepository();
