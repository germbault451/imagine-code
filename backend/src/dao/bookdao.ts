import { BookModel } from 'common';
import { DBProvider } from '../dbprovider';

export class BookDAO {
    private knex = DBProvider.getKnexConnection();

    public async createBook(book: BookModel) {
        const { title, pageCount } = book;
        const [bookId] = await this.knex('book').insert({
            title, pageCount
        });
        return bookId;
    }

    public async getBook(bookId: number | string) {
        const book = await this.knex('book').first('*').where({ bookId });
        if (!book) { return null; }
        return BookModel.fromJSON(book);
    }

    public async updateBook(book: BookModel) {
        const { bookId, title, pageCount } = book;
        await this.knex('book').update({ title, pageCount }).where({ bookId });
    }

    public async deleteBook(bookId: number) {
        await this.knex('book').delete().where({ bookId });
    }

    public async getBooks() {
        const books = await this.knex('book').select('*');

        return books.map(BookModel.fromJSON);
    }
}
