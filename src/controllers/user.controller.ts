import { Request, Response } from 'express';
import { AuthService } from '../services';
import { UserRegisterDto, UserSignInDto } from '../dto/user.dto';
import { IUser } from '../database/model';
import { createJwtAccessToken } from '../utils';
import transformResponse from '../utils/response';
import transformSuccessResponse from '../utils/response';

const authService = new AuthService();

const signup = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signUp(req.body as UserRegisterDto);
    res.status(201).json(transformSuccessResponse('Signup success, Please login', { user }));
};

const signin = async (req: Request, res: Response): Promise<void> => {
    // throw new Error();

    const user: IUser = await authService.signIn(req.body as UserSignInDto);
    const userPayload = {
        userId: user._id as string,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const jwt: string = createJwtAccessToken(userPayload);
    res.status(200).json(transformSuccessResponse('Login success', { user, accessToken: jwt }));
};

export default { signup, signin };
