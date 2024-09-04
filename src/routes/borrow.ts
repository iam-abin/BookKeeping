import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';
import { auth } from '../middlewares';
import { UserRole } from '../utils/roles';

const router: Router = express.Router();

router.post('/borrow', auth(UserRole.BORROWER), libraryController.borrowBook);
router.put('/return/:id', auth(UserRole.BORROWER), libraryController.returnBook);

export default router;
