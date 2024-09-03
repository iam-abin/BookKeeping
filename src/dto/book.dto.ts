export interface BookDto {
    title: string;
    authorId: string;
    libraryId: string;
    coverImageUrl: string;
}

export type CreateBookDto = BookDto;
export type UpdateBookDto = Partial<BookDto>;
