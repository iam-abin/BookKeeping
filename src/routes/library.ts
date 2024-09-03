import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';
import inventoryController from '../controllers/inventory.controller';

import { auth } from '../middlewares';
import { createLibraryRequestBodyValidator, updateLibraryRequestBodyValidator } from '../utils';
import { UserRole } from '../utils/roles';

const router: Router = express.Router();

router.get('/', libraryController.listAllLibraries);
router.get('/:id', libraryController.getLibraryDetailsById);

router.post('/', auth(UserRole.LIBRARY), createLibraryRequestBodyValidator, libraryController.createLibrary);
router.put(
    '/:id',
    auth(UserRole.LIBRARY),
    updateLibraryRequestBodyValidator,
    libraryController.updateLibrary,
);
router.delete('/:id', auth(UserRole.LIBRARY), libraryController.deleteLibrary);

// Inventory management routes
router.get('/:id/inventory', inventoryController.listBooksInLibrary);
router.post('/:id/inventory', inventoryController.addBookToInventory);
router.delete('/:id/inventory/:bookId ', inventoryController.removeBookFromInventory);

export default router;
