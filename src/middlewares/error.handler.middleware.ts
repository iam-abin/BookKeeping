import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';
import { winstonLogError } from '../utils';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const isProduction = process.env.NODE_ENV === 'production';

    // log the error details to the error.log file
    winstonLogError(err);

    // Handle custom errors
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    // For unexpected errors, send a response
    res.status(500).send({
        errors: [
            {
                message: isProduction ? 'Something went wrong!!!' : err.message || 'Internal server error',
            },
        ],
    });
};
