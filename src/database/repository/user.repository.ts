import { UserRegisterDto } from '../../dto/user.dto';
import { IUser, UserModel } from '../model';

export class UserRepository {
    async createUser(userData: UserRegisterDto): Promise<IUser> {
        const newUser = await UserModel.create(userData);
        return newUser;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }
}
