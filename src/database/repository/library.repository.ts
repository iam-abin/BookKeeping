import { LibraryDto } from '../../dto/library.dto';
import { LibraryModel, ILibrary } from '../model';

class LibraryRepository {
    async createLibrary(libraryData: LibraryDto): Promise<ILibrary> {
        return await LibraryModel.create(libraryData);
    }

    async findAllLibraries(): Promise<ILibrary[] | []> {
        return await LibraryModel.find({ isDeleted: false });
    }

    async findLibraryById(libraryId: string): Promise<ILibrary | null> {
        return await LibraryModel.findById(libraryId);
    }

    async findLibraryByName(libraryName: string): Promise<ILibrary | null> {
        return await LibraryModel.findOne({ libraryName });
    }

    async updateLibrary(
        libraryId: string,
        libraryUpdateData?: Partial<LibraryDto>,
    ): Promise<ILibrary | null> {
        const updatedLibrary = await LibraryModel.findByIdAndUpdate(libraryId, libraryUpdateData, {
            new: true,
        });
        return updatedLibrary;
    }

    async deleteLibrary(libraryId: string): Promise<ILibrary | null> {
        // Soft delete library
        const deletedlibrary = await LibraryModel.findByIdAndUpdate(
            libraryId,
            { isDeleted: true },
            { new: true },
        );
        return deletedlibrary;
    }
}

export const libraryRepository = new LibraryRepository();
