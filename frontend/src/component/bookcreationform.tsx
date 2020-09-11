import { BookModel } from 'common';
import React, { FormEvent } from 'react';

interface Props { addBook(bookModel: BookModel): void; }
interface State {
    title?: string;
    pageCount?: number | null;
}

export class BookCreationForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        const { pageCount, title } = this.state;

        return <>
            <form onSubmit={this.createBook}>
                <label>Titre<input type='text' required={true} value={title ?? ''} onChange={e => {
                    this.setState({ title: e.target.value });
                }} /></label>
                <label>Nombre de pages<input type='number' value={pageCount ?? ''} onChange={e => {
                    const newPageCount = parseInt(e.target.value);
                    this.setState({ pageCount: isNaN(newPageCount) ? null : newPageCount });
                }} /></label>
                <input type='submit' value='Créer' />
            </form>
        </>;
    }

    private createBook = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = { title: this.state.title, pageCount: this.state.pageCount };

        const createdBook = await (await fetch('/api/book', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })).json();

        this.props.addBook(createdBook);
    };
}
