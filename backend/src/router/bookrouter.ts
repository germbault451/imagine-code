import { BookModel } from 'common';
import { Router } from 'express';
import { BookDAO } from '../dao/bookdao';
import { wrap } from '../util';

const bookRouter = Router();
const bookDAO = new BookDAO;

bookRouter.use('/:bookId', wrap(async (req, res, next) => {
    const book = await bookDAO.getBook(parseInt(req.params.bookId));
    if (book === null) { return res.sendStatus(404); }
    req.book = book;

    return next();
}));

bookRouter.get('/', wrap(async (_req, res) => {
    const books = await bookDAO.getBooks();
    return res.send(books);
}));

bookRouter.get('/:bookId', wrap(async (req, res) => {
    return res.send(req.book);
}));

bookRouter.post('/', wrap(async (req, res) => {
    const book: BookModel = req.body;
    const bookId = await bookDAO.createBook(book);
    return res.send(await bookDAO.getBook(bookId));
}));

bookRouter.put('/:bookId', wrap(async (req, res) => {
    const updated: BookModel = req.body;
    updated.bookId = req.book.bookId;

    await bookDAO.updateBook(updated);

    return res.send(await bookDAO.getBook(req.book.bookId));
}));

bookRouter.delete('/:bookId', wrap(async (req, res) => {
    await bookDAO.deleteBook(req.book.bookId);
    return res.sendStatus(204);
}));

export { bookRouter };
