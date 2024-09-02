import express, { Router } from 'express';
import authController from '../controllers/user.controller';
import { signinRequestBodyValidator, signupRequestBodyValidator } from '../utils/user.validation';
import { validateRequest } from '../middlewares';


const router: Router = express.Router();


router.post('/register', signupRequestBodyValidator, validateRequest, authController.signup);

// router.post('/login',signinRequestBodyValidator, validateRequest, authController.signin);

export default router;
