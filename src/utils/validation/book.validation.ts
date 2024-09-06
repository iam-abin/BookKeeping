import { body } from 'express-validator';
import { validateRequest } from '../../middlewares';

export const createBookRequestBodyValidator = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    validateRequest,
];

export const updateBookRequestBodyValidator = [
    body('title').optional().notEmpty().withMessage('Title is required').trim().escape(),
    validateRequest,
];
