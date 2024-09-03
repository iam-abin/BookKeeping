import express, { Router } from 'express';
import bookController from '../controllers/book.controller';
import { createBookRequestBodyValidator, updateBookRequestBodyValidator } from '../utils';
import { auth } from '../middlewares';

const router: Router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getABook);

router.post('/', auth, createBookRequestBodyValidator, bookController.createBook);
router.put('/:id', auth, updateBookRequestBodyValidator, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

export default router;
