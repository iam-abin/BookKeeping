import multer, { Multer, StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

type FileSizeLimit = {
    fileSize: number;
};

const MAX_FILE_SIZE_BYTES: number = 10 * 1024 * 1024; // 10 MB limit
const ALLOWED_EXTENSIONS: string[] = ['.jpg', '.jpeg', '.png'];

// Configure file storage
const memoryStorage: StorageEngine = multer.memoryStorage();

// File size limit configuration
const fileSizeLimit: FileSizeLimit = { fileSize: MAX_FILE_SIZE_BYTES };

// File filter function
const fileExtensionFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
): void => {
    const fileExtension: string = path.extname(file.originalname);
    if (!ALLOWED_EXTENSIONS.includes(fileExtension.toLowerCase())) {
        const error = new Error(`Unsupported file type: ${fileExtension}`) as unknown as null;
        callback(error, false);
        return;
    }
    callback(null, true);
};

// Exported Multer configuration
export const multerConfig: Multer = multer({
    storage: memoryStorage,
    limits: fileSizeLimit,
    fileFilter: fileExtensionFilter,
});
