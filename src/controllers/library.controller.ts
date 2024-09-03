import { Request, Response } from 'express';
import { LibraryService } from '../services';
import { ILibrary } from '../database/model';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { NotFoundError } from '../errors';

const libraryService = new LibraryService();

const getAllLibraries = async (req: Request, res: Response): Promise<void> => {
    const libraries: ILibrary[] | [] = await libraryService.getAllLibraries();
    res.status(200).json(libraries);
};

const getLibraryById = async (req: Request, res: Response): Promise<void> => {
    const { libraryId } = req.params;
    const library: ILibrary = await libraryService.getLibraryById(libraryId);
    
    if(!library) throw new NotFoundError("This library does not exist");

    res.status(200).json(library);
};

const createLibrary = async (req: Request, res: Response): Promise<void> => {
    const { libraryId } = req.params;
    let library: ILibrary = await libraryService.getLibraryById(libraryId);
    if(!library) throw new NotFoundError("This library does not exist");
    
    library = await libraryService.createLibrary(req.body as CreateLibraryDto);
    res.status(201).json(library);
};

const updateLibrary = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const library: ILibrary | null = await libraryService.updateLibrary(bookId, req.body as UpdateLibraryDto);
    res.status(200).json(library);
};

const deleteLibrary = async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const library: ILibrary | null = await libraryService.deleteLibrary(bookId);
    res.status(200).json(library);
};

export default { getAllLibraries, getLibraryById, createLibrary, updateLibrary, deleteLibrary };
