import { body } from 'express-validator';

export const createBookRequestBodyValidator = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
];

export const updateBookRequestBodyValidator = [
    body('title').optional().notEmpty().withMessage('Title is required').trim().escape(),
];
