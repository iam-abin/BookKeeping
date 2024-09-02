import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';

import { auth } from '../middlewares';
import { createLibraryRequestBodyValidator, updateLibraryRequestBodyValidator } from '../utils';

const router: Router = express.Router();

router.get('/', auth, libraryController.getAllLibraries);
router.get('/:id', auth, libraryController.getLibraryById);

router.post('/', auth, createLibraryRequestBodyValidator, libraryController.createLibrary);
router.put('/:id', auth, updateLibraryRequestBodyValidator, libraryController.updateLibrary);
router.delete('/:id', auth, libraryController.deleteLibrary);

export default router;
