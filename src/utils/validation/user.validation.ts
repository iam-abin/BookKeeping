import { body } from 'express-validator';
import { UserRole } from '../roles';

export const signinRequestBodyValidator = [
    body('email').isEmail().withMessage('Email must be valid').trim().escape(),
    body('password').notEmpty().withMessage('You must supply a password').trim().escape(), // used to sanitize input by escaping characters that could be used in cross-site scripting (XSS) attacks or other injection vulnerabilities.
    // validateRequest, //now errors contain an object if the above validation fails
];

export const signupRequestBodyValidator = [
    body('name').notEmpty().withMessage('Name is requires').trim().escape(),
    body('email').isEmail().withMessage('Email must be valid').trim().escape(),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
        .escape(),
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(Object.values(UserRole)) // Ensures that the role is one of the predefined values
        .withMessage(`Role must be one of: ${Object.values(UserRole).join(', ')}`),
];
