
export class BookModel {
    public bookId: number;
    public title: string;
    public pageCount?: number;

    public static fromJSON(jsonBookModel: BookModel) {
        const bookModel = new BookModel;
        Object.assign(bookModel, jsonBookModel);
        return bookModel;
    }
}
