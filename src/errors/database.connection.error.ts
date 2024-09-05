import { i18nInstance } from '../config/translation';
import { CustomError } from './custom.error';

export class DatabaseConnectionError extends CustomError {
    statusCode: number = 500;
    constructor() {
        super('Error connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: i18nInstance.__(this.message) }];
    }
}
