import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

export interface IBook extends Document {
    title: string;
    authorId: Schema.Types.ObjectId | IUser;
    coverImageUrl: string;
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
        coverImageUrl: {
            type: String,
            required: true,
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
