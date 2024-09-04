import { InventoryModel, IInventory } from '../model';

export class InventoryRepository {
    async getInventoryByLibraryId(libraryId: string): Promise<IInventory[]> {
        const books: IInventory[] | [] = await InventoryModel.find({ libraryId })
            .populate('libraryId')
            .populate('bookId');
        return books;
    }

    async getInventoryItemByIds(libraryId: string, bookId: string): Promise<IInventory | null> {
        const book: IInventory | null = await InventoryModel.findOne({
            libraryId,
            bookId,
        });

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

    // To update an inventory item count of a library
    async updateInventoryItemCount(
        libraryId: string,
        bookId: string,
        updateCount: number,
    ): Promise<IInventory | null> {
        const inventoryItem: IInventory | null = await InventoryModel.findOneAndUpdate(
            { libraryId, bookId },
            { $inc: { numberOfCopies: updateCount } },
        ).exec(); // Use exec() to return a proper promise;

        return inventoryItem;
    }

    async deleteInventoryItem(libraryId: string, bookId: string): Promise<IInventory | null> {
        const deletedBook: IInventory | null = await InventoryModel.findOneAndUpdate(
            { libraryId, bookId },
            { isDeleted: true, numberOfCopies: 0 },
            { new: true },
        );
        return deletedBook;
    }
}
