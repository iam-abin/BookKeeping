import { body } from 'express-validator';
import { validateRequest } from '../../middlewares';

export const addToInventoryRequestBodyValidator = [
    body('bookId').notEmpty().withMessage('bookId is required').trim().escape(),
    body('charge').notEmpty().withMessage('bookId is required').toInt().trim().escape(),
    body('numberOfCopies').notEmpty().withMessage('numberOfCopies is required').trim().escape(),
    validateRequest,
];
