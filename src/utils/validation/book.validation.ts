import { body } from 'express-validator';

export const createBookRequestBodyValidator = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('authorId').notEmpty().withMessage('Author is required').trim().escape(),
    body('libraryId').notEmpty().withMessage('Library is required').trim().escape(),
];

export const updateBookRequestBodyValidator = [
    body('title').optional().notEmpty().withMessage('Title is required').trim().escape(),
    body('authorId').optional().notEmpty().withMessage('Author is required').trim().escape(),
    body('libraryId').optional().notEmpty().withMessage('Library cannot be empty').trim().escape(),
    body('borrowerId').optional().notEmpty().withMessage('Library is required').trim().escape(),
];
