// import mongoose, { Document, Schema } from 'mongoose';
// import { generateHashedPassword } from '../../utils';

// export interface IAuthor extends Document {
//     name: string;
// }

// const authorSchema = new Schema<IAuthor>(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//     },
//     {
//         timestamps: true,
//         toJSON: {
//             transform(doc, ret) {
//                 delete ret.__v;
//                 delete ret.password;
//             },
//         },
//     },
// );

// export const AuthorModel = mongoose.model<IAuthor>('Author', authorSchema);
