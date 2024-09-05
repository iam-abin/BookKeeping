import { i18nInstance } from '../config/translation';
import { CustomError } from './custom.error';

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(public message: string = 'Not authorized') {
        super(message);
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: i18nInstance.__(this.message) }];
    }
}
