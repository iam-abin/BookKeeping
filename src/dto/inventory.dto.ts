export interface InvertoryDto {
    bookId: string;
}

export interface AddBookToInvertoryDto extends InvertoryDto {
    numberOfCopies: number;
}

export type RemoveBookFromInvertoryDto = InvertoryDto;
