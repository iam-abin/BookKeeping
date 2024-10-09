import { Request, Response } from 'express';
import { authService } from '../services';
import { UserRegisterDto, UserSignInDto } from '../dto/user.dto';
import { IUser } from '../database/model';
import transformSuccessResponse from '../utils/response';

const signup = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signUp(req.body as UserRegisterDto);
    res.status(201).json(transformSuccessResponse('Signup success, Please login', { user }));
};

const signin = async (req: Request, res: Response): Promise<void> => {
    const user: { user: IUser; accessToken: string } = await authService.signIn(req.body as UserSignInDto);
    res.status(200).json(transformSuccessResponse('Login success', user));
};

export default { signup, signin };
