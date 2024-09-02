import express, { Router } from 'express';
import bookController from '../controllers/book.controller';
import {
    createBookRequestBodyValidator,
    updateBookRequestBodyValidator,
} from '../utils/validation/book.validation';

const router: Router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getABook);

router.post('/', createBookRequestBodyValidator, bookController.createBook);
router.put('/:id', updateBookRequestBodyValidator, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
