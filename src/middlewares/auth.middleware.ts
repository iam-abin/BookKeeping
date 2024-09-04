import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, NotAuthorizedError } from '../errors';
import { config } from '../config/config';
import { UserRole } from '../utils/roles';

export interface IPayload {
    userId: string;
    name: string;
    email: string;
    role: UserRole;
}

declare global {
    namespace Express {
        interface Request {
            user?: IPayload;
        }
    }
}

export const auth = (requiredRole: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) throw new NotAuthorizedError('UnAuthorized Request');
            const decoded = jwt.verify(token, config.JWT_SECRET!) as IPayload;

            if (decoded.role !== requiredRole)
                throw new ForbiddenError('You have no permission to access this route');
            req.user = decoded;
            console.log('req.user', req.user);

            next();
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
};
