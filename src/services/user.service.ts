import { IUser } from '../database/model';
import { UserRepository } from '../database/repository';
import { UserRegisterDto, UserSignInDto } from '../dto/user.dto';
import { BadRequestError } from '../errors/badrequest.error';

const userRepository = new UserRepository();

export class AuthService {
    public async signUp(userRegisterDto: UserRegisterDto): Promise<IUser> {
        const { email } = userRegisterDto;

        const existingUser: IUser | null = await userRepository.findByEmail(email);

        if (existingUser) throw new BadRequestError('User already exists');

        const createdUser = await userRepository.createUser(userRegisterDto);
        return createdUser;
    }

    public async signIn(userSignInDTO: UserSignInDto): Promise<IUser> {
        const { email } = userSignInDTO;

        const existingUser: IUser | null = await userRepository.findByEmail(email);

        if (!existingUser) throw new BadRequestError('Invalid email or password');

        return existingUser;
    }
}
