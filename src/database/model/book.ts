import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    authorId: Schema.Types.ObjectId;
    libraryId: Schema.Types.ObjectId;
    coverImageUrl: string;
    numberOfCopies: number;
    isDeleted: boolean;
}

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        libraryId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Library',
        },
        coverImageUrl: {
            type: String,
            required: true,
        },
        numberOfCopies: {
            type: Number,
            default: 1
        },
        isDeleted: {
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

export const BookModel = mongoose.model<IBook>('Book', bookSchema);
