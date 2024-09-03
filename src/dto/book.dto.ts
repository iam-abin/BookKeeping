export interface BookDto {
    title: string;
    authorId: string;
    libraryId: string;
    coverImageUrl: string;
    numberOfCopies: number;
}

export type CreateBookDto = BookDto;
export type UpdateBookDto = BookDto;
