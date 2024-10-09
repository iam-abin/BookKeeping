import { IUser } from '../database/model';
import { userRepository } from '../database/repository';
import { UserRegisterDto, UserSignInDto } from '../dto/user.dto';
import { BadRequestError } from '../errors';
import { comparePassword, createJwtAccessToken } from '../utils';

class AuthService {
    public async signUp(userRegisterDto: UserRegisterDto): Promise<IUser> {
        const { email } = userRegisterDto;

        const existingUser: IUser | null = await userRepository.findByEmail(email);
        if (existingUser) throw new BadRequestError('User already exists');

        const createdUser = await userRepository.createUser(userRegisterDto);
        return createdUser;
    }

    public async signIn(userSignInDto: UserSignInDto): Promise<{ user: IUser; accessToken: string }> {
        const { email, password } = userSignInDto;

        const existingUser: IUser | null = await userRepository.findByEmail(email);
        if (!existingUser) throw new BadRequestError('Invalid email or password');
        const isSamePassword: boolean = await comparePassword(password, existingUser.password);
        if (!isSamePassword) throw new BadRequestError('Invalid email or password');

        const userPayload = {
            userId: existingUser._id as string,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
        };
        const jwt: string = createJwtAccessToken(userPayload);

        return { user: existingUser, accessToken: jwt };
    }
}

export const authService = new AuthService();
