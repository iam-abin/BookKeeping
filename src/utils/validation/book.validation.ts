import { body } from 'express-validator';

export const createBookRequestBodyValidator = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('authorId').notEmpty().withMessage('Author is required').trim().escape(),
    body('coverImageUrl')
        .notEmpty()
        .withMessage('Library is required')
        .isURL({ protocols: ['http', 'https'], require_protocol: true })
        .withMessage('Cover image must be a valid URL')
        .trim()
        .escape(),
];

export const updateBookRequestBodyValidator = [
    body('title').optional().notEmpty().withMessage('Title is required').trim().escape(),
    body('authorId').optional().notEmpty().withMessage('Author is required').trim().escape(),
    body('coverImageUrl')
        .optional()
        .notEmpty()
        .withMessage('coverImageUrl is required')
        .isURL({ protocols: ['http', 'https'], require_protocol: true })
        .withMessage('Cover image must be a valid URL')
        .trim()
        .escape(),
];
