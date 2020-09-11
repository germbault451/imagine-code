import { BookModel } from 'common';
import React from 'react';
import { BookCreationForm } from './bookcreationform';

interface Props { }
interface State {
    books?: BookModel[];
}

export class BookEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
        const books = (await (await fetch('/api/book')).json() as any[]).map(BookModel.fromJSON);
        this.setState({ books });
    }

    public render() {
        const { books } = this.state;
        if (!books) { return 'Chargement...'; }

        return <>
            {books.map(book => <div key={book.bookId}>{book.title} {this.getPageCount(book)}</div>)}
            <BookCreationForm addBook={book => {
                books.push(book);
                this.setState({ books });
            }} />
        </>;
    }

    private getPageCount = (book: BookModel) => {
        if (book.pageCount === null) {
            return 'nombre de pages inconnu';
        } else {
            return `${book.pageCount} pages`;
        }
    };
}
