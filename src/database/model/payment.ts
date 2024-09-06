import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    borrowerId: Schema.Types.ObjectId;
    borrowId: Schema.Types.ObjectId;
    amount: number;
}

const paymentSchema = new Schema<IPayment>(
    {
        borrowerId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        borrowId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Borrow',
        },
        amount: {
            type: Number,
            required: true,
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

export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema);
