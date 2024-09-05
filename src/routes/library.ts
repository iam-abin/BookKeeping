import express, { Router } from 'express';
import libraryController from '../controllers/library.controller';
import inventoryController from '../controllers/inventory.controller';

import { auth } from '../middlewares';
import { createLibraryRequestBodyValidator, updateLibraryRequestBodyValidator } from '../utils';
import { UserRole } from '../utils/roles';
import { addToInventoryRequestBodyValidator } from '../utils/validation/inventory.validation';

const router: Router = express.Router();

// Anyone can see the list of all the libraries
router.get('/', libraryController.listAllLibraries);

// In this application admin is creating the library and so he can access
// Books owned by the Library
// Borrowers associated with each book
router.get('/:id', auth(UserRole.ADMIN), libraryController.getLibraryDetailsById);

router.post('/', auth(UserRole.ADMIN), createLibraryRequestBodyValidator, libraryController.createLibrary);

router.put('/:id', auth(UserRole.ADMIN), updateLibraryRequestBodyValidator, libraryController.updateLibrary);
router.delete('/:id', auth(UserRole.ADMIN), libraryController.deleteLibrary);

// Inventory management routes
router.get('/:id/inventory', auth(UserRole.ADMIN), inventoryController.listBooksInLibrary);
router.get('/:id/inventory/:bookId', auth(UserRole.ADMIN), inventoryController.getInventoryItemById);
router.post(
    '/:id/inventory',
    auth(UserRole.ADMIN),
    addToInventoryRequestBodyValidator,
    inventoryController.addBookToInventory,
);
router.delete('/:id/inventory/:bookId', auth(UserRole.ADMIN), inventoryController.removeBookFromInventory);

export default router;
