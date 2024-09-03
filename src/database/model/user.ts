import mongoose, { Document, Schema } from 'mongoose';
import { generateHashedPassword } from '../../utils';
import { UserRole } from '../../utils/roles';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(UserRole),
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                delete ret.password;
            },
        },
    },
);

// To hash password before saving the user to db
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword: string = await generateHashedPassword(this.password);
        this.password = hashedPassword;
        next();
    } catch (error: unknown) {
        next(error as Error);
    }
});

// To hash password before saving the updated password to db
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as Partial<IUser>;
    if (!update.password) return next();

    try {
        const hashedPassword: string = await generateHashedPassword(update.password);
        this.setUpdate({ ...update, password: hashedPassword });
        next();
    } catch (error: unknown) {
        next(error as Error);
    }
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
