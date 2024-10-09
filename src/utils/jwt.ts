import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IJwtPayload } from '../middlewares';

export const createJwtAccessToken = (payload: IJwtPayload): string => {
    const accessToken: string = jwt.sign(payload, config.JWT_SECRET as string, {
        expiresIn: config.JWT_EXPIRY_TIME,
    });
    return accessToken;
};
