import mongoose, { Document, Schema } from 'mongoose';

export interface ILibrary extends Document {
    name: string;
    address: string;
    contactNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

const LibrarySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true },
    },
    { timestamps: true },
);

export const LibraryModel = mongoose.model<ILibrary>('Library', LibrarySchema);