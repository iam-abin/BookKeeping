import { body } from 'express-validator';

export const addToInventoryRequestBodyValidator = [
    body('bookId').notEmpty().withMessage('bookId is required').trim().escape(),
    body('numberOfCopies').notEmpty().withMessage('numberOfCopies is required').trim().escape(),
];

// export const updateInventoryRequestBodyValidator = [
//     body('bookId').optional().notEmpty().withMessage('Title is required').trim().escape(),
//     body('numberOfCopies')
//         .notEmpty()
//         .withMessage('Author is required')
//         .isNumeric()
//         .withMessage('numberOfCopies must be a number')
//         .trim()
//         .escape(),
// ];
