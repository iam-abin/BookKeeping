import { ILibrary } from '../database/model';
import { LibraryRepository } from '../database/repository';
import { CreateLibraryDto, UpdateLibraryDto } from '../dto/library.dto';
import { NotFoundError } from '../errors';

const libraryRepository = new LibraryRepository();

export class LibraryService {
    public async getAllLibraries(): Promise<ILibrary[] | []> {
        const libraries: ILibrary[] | [] = await libraryRepository.findAllLibraries();
        return libraries;
    }

    public async getLibraryById(libraryId: string): Promise<ILibrary> {
        const library: ILibrary | null = await libraryRepository.findById(libraryId);
        if (!library) throw new NotFoundError('Library not found');
        return library;
    }

    public async createLibrary(createLibraryDto: CreateLibraryDto): Promise<ILibrary> {
        const library: ILibrary = await libraryRepository.createLibrary(createLibraryDto);
        return library;
    }

    public async updateLibrary(
        libraryId: string,
        updateLibraryDto: Partial<UpdateLibraryDto>,
    ): Promise<ILibrary | null> {
        const library: ILibrary | null = await libraryRepository.updateLibrary(libraryId, updateLibraryDto);
        return library;
    }

    public async deleteLibrary(libraryId: string): Promise<ILibrary | null> {
        const library: ILibrary | null = await libraryRepository.deleteLibrary(libraryId);
        return library;
    }
}
