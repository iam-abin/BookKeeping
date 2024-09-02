import { body } from 'express-validator';

export const createBookRequestBodyValidator = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('author').notEmpty().withMessage('Author is required').trim().escape(),
    body('library').notEmpty().withMessage('Library is required').trim().escape(),
];

export const updateBookRequestBodyValidator = [
    body('title').optional().notEmpty().withMessage('Title is required').trim().escape(),
    body('author').optional().notEmpty().withMessage('Author is required').trim().escape(),
    body('library').optional().notEmpty().withMessage('Library cannot be empty').trim().escape(),
    body('borrower').optional().notEmpty().withMessage('Library is required').trim().escape(),
];
