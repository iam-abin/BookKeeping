export interface InvertoryDto {
    bookId: string;
}

export interface AddBookToInvertoryDto extends InvertoryDto {
    charge: number;
    numberOfCopies: number;
}

export type RemoveBookFromInvertoryDto = InvertoryDto;
