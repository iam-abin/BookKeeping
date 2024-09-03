import mongoose, { Document, Schema } from 'mongoose';

export interface IBorrow extends Document {
    bookId: Schema.Types.ObjectId;
    borrowerId: Schema.Types.ObjectId;
    libraryId: Schema.Types.ObjectId;
    isReturned: boolean
}

const borrowSchema = new Schema<IBorrow>(
    {
        bookId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Book',
        },
        borrowerId: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: 'User',
        },
        libraryId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Library',
        },
        isReturned: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            },
        },
    },
);

export const BorrowModel = mongoose.model<IBorrow>('Borrow', borrowSchema);
