import { Request, Response } from 'express';
import { AuthService } from '../services';
import { UserSignUpDto } from '../dto/user.dto';
import { IUser } from '../database/model';

const authService = new AuthService();

// const signin = async (req: Request, res: Response): Promise<void> => {

//     res.status(200).json({});
// };

const signup = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signUp(req.body as UserSignUpDto);
    res.status(201).json(user);
};

// const profile = async (req: Request, res: Response): Promise<void> => {
//     res.status(200).json({});
// };

export default { signup };
