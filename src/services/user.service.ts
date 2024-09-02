import { IUser } from '../database/model';
import { UserRepository } from '../database/repository/user.repository';
import { UserSignUpDto } from '../dto/user.dto';

const userRepository = new UserRepository();

export class AuthService {
    public async signUp(userSignUpDTO: UserSignUpDto): Promise<IUser> {
        const { email } = userSignUpDTO;

        const existingUser: (IUser | null) = await userRepository.findByEmail(email);

        if (existingUser) throw new Error('User already exists');

        const createdUser = await userRepository.createUser(userSignUpDTO);
        return createdUser;
    }
}
