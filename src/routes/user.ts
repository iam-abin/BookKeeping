import express, { Router } from 'express';
import authController from '../controllers/user.controller';
import { signinRequestBodyValidator, signupRequestBodyValidator } from '../utils';

const router: Router = express.Router();

router.post('/register', signupRequestBodyValidator, authController.signup);
router.post('/login', signinRequestBodyValidator, authController.signin);

export default router;
