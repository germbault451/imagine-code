import { MessageModel } from 'common';
import React, { FormEvent } from 'react';

interface Props { addMessage(messageModel: MessageModel): void; }
interface State {
    first_name?: string;
    city?: string;
    object?: string;
    text?: string;
    disabled?: boolean;
}

export class BookCreationMessageForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        const { first_name, city, object, text } = this.state;

        return <>
            <section className='form'>
                <h2>Laissez-nous un commentaire</h2>
                <form onSubmit={this.createBookMessage}>

                    <input type='text' placeholder='Prénom' required={true} value={first_name ?? ''} onChange={e => { this.setState({ first_name: e.target.value }); }} />
                    <input type='text' placeholder='Ville' required={true} value={city ?? ''} onChange={e => { this.setState({ city: e.target.value }); }} />

                    <select value={object ?? ''} onChange={e => { this.setState({ object: e.target.value }); }} >
                        <option value='' disabled={true}>Selectionnez l'object du message</option>
                        <option value='service'>service</option>
                        <option value='entreprise'>entreprise</option>
                        <option value='commentaire'>commentaire</option>
                    </select>

                    <textarea placeholder='Inscrire votre commentaire ici' required={true} value={text ?? ''} onChange={e => { this.setState({ text: e.target.value }); }} />

                    <input type='submit' value='Envoyé' />

                </form>
            </section>
        </>;
    }

    private createBookMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = { first_name: this.state.first_name, city: this.state.city, object: this.state.object, text: this.state.text };

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
