export interface BookDto {
    title: string;
    author: string;
    library: string;
    coverImageUrl: string;
}

export type CreateBookDto = BookDto;

export interface UpdateBookDto extends BookDto {
    borrower?: string;
}
