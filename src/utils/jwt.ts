import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { UserRole } from './roles';

interface IJwtPayload {
    userId: string;
    name: string;
    email: string;
    role: UserRole;
}

export const createJwtAccessToken = (payload: IJwtPayload): string => {
    const accessToken: string = jwt.sign(payload, config.JWT_SECRET as string, {
        expiresIn: config.JWT_EXPIRY_TIME,
    });
    return accessToken;
};
