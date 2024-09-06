import mongoose, { Document, Schema } from 'mongoose';

export interface ILibrary extends Document {
    libraryName: string;
    address: string;
    contactNumber: string;
    isDeleted: boolean;
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
