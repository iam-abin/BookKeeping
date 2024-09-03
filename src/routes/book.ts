import express, { Router } from 'express';
import bookController from '../controllers/book.controller';
import { createBookRequestBodyValidator, updateBookRequestBodyValidator } from '../utils';
import { auth } from '../middlewares';
import { UserRole } from '../utils/roles';

const router: Router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getABook);
router.post('/', auth(UserRole.AUTHOR), createBookRequestBodyValidator, bookController.createBook);

router.put('/:id', auth(UserRole.AUTHOR), updateBookRequestBodyValidator, bookController.updateBook);

export default router;
