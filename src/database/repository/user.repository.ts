import { UserSignUpDto } from "../../dto/user.dto";
import { IUser, UserModel } from "../model";

export class UserRepository {
    async createUser(userData: UserSignUpDto): Promise<IUser> {
        const newUser = await UserModel.create(userData);
        return newUser;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({email})
        return user;
    }

    // async updateUser(userId: number, otp: string, otpExpiry: number): Promise<IUser> {
    //     const user = await UserModel.update(
    //         { otp, otpExpiry },
    //         { where: { id: userId } }
    //     );
    //     return user;
    // }

    // async verifyUser(email: string) {
    //     const user = await UserModel.update(
    //         { isVerified: true, otp: null, otpExpiry: null },
    //         { where: { email } }
    //     );
    //     return user;
    // }
}