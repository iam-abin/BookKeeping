import express, { Router } from 'express';
import bookController from '../controllers/book.controller';
import libraryController from '../controllers/library.controller';
import { createBookRequestBodyValidator, updateBookRequestBodyValidator } from '../utils';
import { auth } from '../middlewares';
import { UserRole } from '../utils/roles';
import { multerConfig } from '../config/multer';

const router: Router = express.Router();

router.get('/', bookController.getAllBooks);
// router.get('/:id/:libraryId', bookController.getABook); - instead of // GET /api/books/:id
// Retrieve details of a specific book by its ID
//  — API should include the details of the Library,
//  Author and Borrower associated with the Book.
router.get('/:id/:libraryId', auth(UserRole.ADMIN), libraryController.getALibraryBookDetails);

router.post(
    '/',
    auth(UserRole.AUTHOR),
    multerConfig.single('image'),
    createBookRequestBodyValidator,
    bookController.createBook,
);
router.put(
    '/:id',
    auth(UserRole.AUTHOR),
    multerConfig.single('image'),
    updateBookRequestBodyValidator,
    bookController.updateBook,
);
router.delete('/:id', auth(UserRole.AUTHOR), bookController.deleteBook);

export default router;
