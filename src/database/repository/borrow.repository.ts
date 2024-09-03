import mongoose from 'mongoose';
import { BorrowModel, IBorrow } from '../model';

export class BorrowRepository {
    async borrowBook(
        libraryId: string,
        bookId: string,
        userId: string,
        session: mongoose.ClientSession,
    ): Promise<IBorrow | null> {
        const books = await BorrowModel.create([{ libraryId, bookId, borrowerId: userId }], { session });

        // Since `create` returns an array, we need to access the first element
        const book: IBorrow = books[0] as IBorrow; // Type assertion

        return book;
    }

    async returnBook(
        libraryId: string,
        bookId: string,
        userId: string,
        session: mongoose.ClientSession,
    ): Promise<IBorrow | null> {
        const returned: IBorrow | null = await BorrowModel.findOneAndUpdate(
            { libraryId, _id: bookId },
            { isReturned: true },
            { new: true, session },
        );
        return returned;
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
