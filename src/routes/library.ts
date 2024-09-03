import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';
import inventoryController from '../controllers/inventory.controller';

import { auth } from '../middlewares';
import { createLibraryRequestBodyValidator, updateLibraryRequestBodyValidator } from '../utils';

const router: Router = express.Router();

router.get('/', libraryController.getAllLibraries);
router.get('/:id', libraryController.getLibraryById);

router.post('/', auth, createLibraryRequestBodyValidator, libraryController.createLibrary);
router.put('/:id', auth, updateLibraryRequestBodyValidator, libraryController.updateLibrary);
router.delete('/:id', auth, libraryController.deleteLibrary);

// Inventory management routes
router.get('/:id/inventory', inventoryController.getLibraryInventriesByLibraryId);
// router.post('/:id/inventory', inventoryController.getLibraryById);
router.delete('/:id/inventory/:bookId ', inventoryController.deleteLibraryInventryItem);

export default router;
