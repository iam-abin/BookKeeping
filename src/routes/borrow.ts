import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';
import { auth } from '../middlewares';
import { UserRole } from '../utils/roles';

const router: Router = express.Router();

router.post('/borrow/:libraryId/:bookId', auth(UserRole.BORROWER), libraryController.borrowBook); // auth(borrower);
router.put('/return/:libraryId/:bookId', auth(UserRole.BORROWER), libraryController.returnBook); //auth(borrower);

export default router;
