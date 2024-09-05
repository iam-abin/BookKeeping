import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
    libraryId: Schema.Types.ObjectId;
    bookId: Schema.Types.ObjectId;
    numberOfCopies: number;
    charge: number;
    isDeleted: boolean;
}

const inventorySchema = new Schema<IInventory>(
    {
        libraryId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Library',
        },
        bookId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Book',
        },
        numberOfCopies: {
            type: Number,
            default: 1,
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
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            },
        },
    },
);

export const InventoryModel = mongoose.model<IInventory>('Inventory', inventorySchema);
