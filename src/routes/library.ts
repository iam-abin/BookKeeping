import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';
import inventoryController from '../controllers/inventory.controller';

import { auth } from '../middlewares';
import { createLibraryRequestBodyValidator, updateLibraryRequestBodyValidator } from '../utils';
import { UserRole } from '../utils/roles';
import { addToInventoryRequestBodyValidator } from '../utils/validation/inventory.validation';

const router: Router = express.Router();

router.get('/', libraryController.listAllLibraries);
router.get('/:id', libraryController.getLibraryDetailsById);

router.post('/', auth(UserRole.ADMIN), createLibraryRequestBodyValidator, libraryController.createLibrary);

router.put('/:id', auth(UserRole.ADMIN), updateLibraryRequestBodyValidator, libraryController.updateLibrary);
router.delete('/:id', auth(UserRole.ADMIN), libraryController.deleteLibrary);

// Inventory management routes
router.get('/:id/inventory', inventoryController.listBooksInLibrary);
router.post(
    '/:id/inventory',
    auth(UserRole.ADMIN),
    addToInventoryRequestBodyValidator,
    inventoryController.addBookToInventory,
);
router.delete('/:id/inventory/:bookId ', auth(UserRole.ADMIN), inventoryController.removeBookFromInventory);

export default router;
