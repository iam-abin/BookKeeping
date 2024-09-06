import { ValidationError } from 'express-validator';
import { CustomError } from './custom.error';
import { convertMessage } from '../utils';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            if (err.type === 'field') {
                return { message: convertMessage(err.msg), field: err.path };
            }
            return { message: convertMessage(err.msg) };
        });
    }
}
