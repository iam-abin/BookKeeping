import { BorrowModel, IBorrow } from '../model';

export class BorrowRepository {
    async borrowBook(libraryId: string, bookId: string, userId: string): Promise<IBorrow | null> {
        const borrowedBook = await BorrowModel.create({ libraryId, bookId, borrowerId: userId });
        return borrowedBook;
    }

    async returnBook(libraryId: string, bookId: string, borrowerId: string): Promise<IBorrow | null> {
        const returned: IBorrow | null = await BorrowModel.findOneAndUpdate(
            { libraryId, bookId, borrowerId },
            { isReturned: true },
            {
                new: true,
            },
        );
        return returned;
    }
}
