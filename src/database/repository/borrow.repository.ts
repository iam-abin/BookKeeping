import { ClientSession } from 'mongoose';
import { BorrowModel, IBorrow } from '../model';

export class BorrowRepository {
    async borrowBook(
        libraryId: string,
        bookId: string,
        userId: string,
        session?: ClientSession,
    ): Promise<IBorrow | null> {
        const borrowedBook = await BorrowModel.create(
            [
                {
                    libraryId,
                    bookId,
                    borrowerId: userId,
                    isReturned: false,
                },
            ],
            {
                session,
            },
        );
        return borrowedBook[0];
    }

    async updateReturn(
        libraryId: string,
        bookId: string,
        borrowerId: string,
        session?: ClientSession,
    ): Promise<IBorrow | null> {
        const returned: IBorrow | null = await BorrowModel.findOneAndUpdate(
            { libraryId, bookId, borrowerId },
            [{ $set: { isReturned: { $not: '$isReturned' } } }],
            {
                new: true,
                session,
            },
        );
        return returned;
    }

    async findByLibraryId(libraryId: string): Promise<IBorrow[] | null> {
        const borrowedBook = await BorrowModel.find({ libraryId }).populate('borrowerId').populate('bookId');
        return borrowedBook;
    }

    async findByLibraryAndBookId(libraryId: string, bookId: string): Promise<IBorrow[] | null> {
        const bookBorrowDetails = await BorrowModel.find({ libraryId, bookId }).populate('borrowerId');
        return bookBorrowDetails;
    }

    async findBorrowed(libraryId: string, bookId: string, borrowerId: string): Promise<IBorrow | null> {
        const bookBorrowDetails = await BorrowModel.findOne({ libraryId, bookId, borrowerId });
        return bookBorrowDetails;
    }
}
