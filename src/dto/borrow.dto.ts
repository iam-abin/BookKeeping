export interface BorrowDto {
    libraryId: string;
}

export interface BorrowBookDto extends BorrowDto {
    bookId: string;
}

export type ReturnBookDto = BorrowDto;
