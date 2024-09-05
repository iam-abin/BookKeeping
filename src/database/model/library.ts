import mongoose, { Document, Schema } from 'mongoose';

export interface ILibrary extends Document {
    libraryName: string;
    address: string;
    contactNumber: string;
    isDeleted: boolean;
    charge: number;
    createdAt: Date;
    updatedAt: Date;
}

const LibrarySchema: Schema = new Schema<ILibrary>(
    {
        libraryName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        charge: {
            type: Number,
            required: true,
            default: 10,
            min: 10,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const LibraryModel = mongoose.model<ILibrary>('Library', LibrarySchema);
