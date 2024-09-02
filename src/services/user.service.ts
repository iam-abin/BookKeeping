import { IUser } from '../database/model';
import { UserRepository } from '../database/repository';
import { UserRegisterDto, UserSignInDto } from '../dto/user.dto';

const userRepository = new UserRepository();

export class AuthService {
    public async signUp(userRegisterDto: UserRegisterDto): Promise<IUser> {
        const { email } = userRegisterDto;

        const existingUser: IUser | null = await userRepository.findByEmail(email);

        if (existingUser) throw new Error('User already exists');

        const createdUser = await userRepository.createUser(userRegisterDto);
        return createdUser;
    }

    public async signIn(userSignInDTO: UserSignInDto): Promise<IUser> {
        const { email } = userSignInDTO;

        const existingUser: IUser | null = await userRepository.findByEmail(email);

        if (!existingUser) throw new Error('Invalid email or password');

        return existingUser;
    }
}
