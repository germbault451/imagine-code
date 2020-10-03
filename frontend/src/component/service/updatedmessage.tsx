import { Api } from 'api';
import { MessageModel } from 'common';
import React from 'react';

interface Props { message: MessageModel; onRequestClose(): void; }
interface State {
    text: string;
}
export class UpdatedMessageEditor extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = { text: props.message.text };
    }

    public render() {
        return <>
            <form className='form__modal' onSubmit={this.updatedMessage}>

                <textarea placeholder='Mettre à jour votre commentaire ici' required={true} value={this.state.text ?? ''} onChange={e => this.setState({ text: e.target.value })} />

                <button type='submit'>Sauvegarder</button>
                <button type='button' onClick={this.props.onRequestClose}>Annuler</button>
            </form>
        </>;
    }

    private updatedMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        this.props.message.text = this.state.text;
        await this.api.put('/message', this.props.message.messageId, this.props.message);
        this.props.onRequestClose();
    };
}
