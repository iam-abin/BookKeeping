import { body } from 'express-validator';

export const createLibraryRequestBodyValidator = [
    body('libraryName').notEmpty().withMessage('Library name is required').trim().escape(),
    body('address').notEmpty().withMessage('Library address is required').trim().escape(),
    body('contactNumber')
        .notEmpty()
        .withMessage('Library contact number is required')
        .isLength({ min: 10, max: 10 })
        .withMessage('Library contact number must be 10 digits')
        .isNumeric()
        .withMessage('Library contact number must be numeric')
        .trim()
        .escape(),
];

export const updateLibraryRequestBodyValidator = [
    body('libraryName').optional().notEmpty().withMessage('Library name cannot be empty').trim().escape(),
    body('address').optional().notEmpty().withMessage('Library address cannot be empty').trim().escape(),
    body('contactNumber')
        .optional()
        .notEmpty()
        .withMessage('Library contact number cannot be empty')
        .isLength({ min: 10, max: 10 })
        .withMessage('Library contact number must be 10 digits')
        .isNumeric()
        .withMessage('Library contact number must be numeric')
        .trim()
        .escape(),
];
