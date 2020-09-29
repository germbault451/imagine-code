import { MessageModel } from 'common';
import React, { FormEvent } from 'react';

interface Props { addMessage(messageModel: MessageModel): void; }
interface State {
    first_name?: string;
    city?: string;
    objet?: string;
    text?: string;
}

export class BookCreationMessageForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        const { first_name, city, objet, text } = this.state;

        return <>
            <form onSubmit={this.createBookMessage}>
                <label>Prénom<input type='text' required={true} value={first_name ?? ''} onChange={e => {
                    this.setState({ first_name: e.target.value });
                }} /></label>
                <label>Ville<input type='text' required={true} value={city ?? ''} onChange={e => {
                    this.setState({ city: e.target.value });
                }} /></label>
                <label>Objet<input type='text' value={objet ?? ''} onChange={e => {
                    this.setState({ objet: e.target.value });
                }} /></label>
                <label>Commentaire<textarea required={true} value={text ?? ''} onChange={e => {
                    this.setState({ text: e.target.value });
                }} /></label>
                <input type='submit' value='Créer' />
            </form>
        </>;
    }

    private createBookMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = { first_name: this.state.first_name, city: this.state.city, objet: this.state.objet, text: this.state.text };

        const createdBookMessage = await (await fetch('/api/message', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })).json();

        this.props.addMessage(createdBookMessage);
    };
}
