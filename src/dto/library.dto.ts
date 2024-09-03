export interface LibraryDto {
    libraryName: string;
    address: string;
    contactNumber: string;
}

export type CreateLibraryDto = LibraryDto;
export type UpdateLibraryDto = LibraryDto;
