import { Request, Response } from 'express';
import { AuthService } from '../services';
import { UserRegisterDto, UserSignInDto } from '../dto/user.dto';
import { IUser } from '../database/model';

const authService = new AuthService();

const signup = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signUp(req.body as UserRegisterDto);
    res.status(201).json(user);
};

const signin = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signIn(req.body as UserSignInDto);
    res.status(201).json(user);
};

export default { signup, signin };
