import { CreateLibraryDto, UpdateLibraryDto } from '../../dto/library.dto';
import { LibraryModel, ILibrary } from '../model';

export class LibraryRepository {
    async createLibrary(libraryData: CreateLibraryDto): Promise<ILibrary> {
        const library = await LibraryModel.create(libraryData);
        return library;
    }

    async findAllLibraries(): Promise<ILibrary[] | []> {
        const librarys = await LibraryModel.find();
        return librarys;
    }

    async findById(libraryId: string): Promise<ILibrary | null> {
        const library = await LibraryModel.findById({ libraryId });
        return library;
    }

    async updateLibrary(libraryId: string, libraryUpdateData?: Partial<UpdateLibraryDto>): Promise<ILibrary | null> {
        const updatedLibrary = await LibraryModel.findByIdAndUpdate(libraryId, { ...libraryUpdateData }, { new: true });
        return updatedLibrary;
    }

    async deleteLibrary(libraryId: string): Promise<ILibrary | null> {
        const deletedlibrary = await LibraryModel.findByIdAndUpdate(libraryId, { isDeleted: true }, { new: true });
        return deletedlibrary;
    }
}
