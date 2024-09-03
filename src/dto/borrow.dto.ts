export interface BorrowDto {
    libraryId: string;
    bookId: string;
}

export type BorrowBookDto = BorrowDto;
export type ReturnBookDto = BorrowDto;
