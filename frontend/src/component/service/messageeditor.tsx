import { Api } from 'api';
import { MessageModel } from 'common';
import React from 'react';
import Modal from 'react-modal';
import { UpdatedMessageEditor } from './updatedmessage';

interface Props { }
interface State {
    messages?: MessageModel[];
    first_name?: string;
    city?: string;
    object?: string;
    text?: string;
    disabled?: boolean;
    messageBeingUpdated?: MessageModel;
}
export class MessageEditor extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    public async componentDidMount() {
        const messages = (await this.api.getJson('/message') as any[]).map(MessageModel.fromJSON);
        this.setState({ messages });
    }
    public render() {
        const { messages } = this.state;
        if (!messages) { return 'Chargement...'; }

        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };
        const closeConfirm = () => this.setState({ messageBeingUpdated: undefined });

        return <>
            <Modal
                isOpen={this.state.messageBeingUpdated !== undefined}
                onRequestClose={closeConfirm}
                className='Modal'
                contentLabel='Example Modal'
            >
                {this.state.messageBeingUpdated && <UpdatedMessageEditor onRequestClose={closeConfirm}
                    message={this.state.messageBeingUpdated} />}
            </Modal>
            <section className='background__message'>
                <h2>Ce que les gens en pensent</h2>
                {messages.map(message =>
                    <section key={message.messageId} className='ajust'>
                        <p className='color-01 strong'>{message.first_name}, de: {message.city}
                            <span className='closemodal' onClick={() => this.deleteMessage(message)}>x</span></p>
                        <p className='color-01'>Object: {message.object}</p>
                        <p className='color-01'>{this.getMessageCount(message)}</p>
                        <section className='space'>
                            <p className='color-01'>Publié le: {message.created_at.toLocaleDateString('fr-CA', dateFormat)}</p>
                            <div>
                                <button type='button' onClick={() => this.setState({ messageBeingUpdated: message })}>Modifier votre message</button>
                                <button type='button'>Lires plus</button>
                            </div>
                        </section>
                    </section>)}
            </section>

            <section className='form'>
                <h2>Laissez-nous un commentaire</h2>
                <form onSubmit={this.createMessage}>

                    <input type='text' placeholder='Prénom' required={true} value={this.state.first_name ?? ''} onChange={e => { this.setState({ first_name: e.target.value }); }} />
                    <input type='text' placeholder='Ville' required={true} value={this.state.city ?? ''} onChange={e => { this.setState({ city: e.target.value }); }} />

                    <select value={this.state.object ?? ''} onChange={e => { this.setState({ object: e.target.value }); }} >
                        <option value='' disabled={true}>Selectionnez l'object du message</option>
                        <option value='service'>service</option>
                        <option value='entreprise'>entreprise</option>
                        <option value='commentaire'>commentaire</option>
                    </select>

                    <textarea placeholder='Inscrire votre commentaire ici' required={true} value={this.state.text ?? ''} onChange={e => { this.setState({ text: e.target.value }); }} />

                    <input type='submit' value='Envoyé' />

                </form>
            </section>
        </>;
    }
    private getMessageCount = (message: MessageModel) => {
        if (message.text === null) {
            return 'message non trouvé';
        } else {
            return `${message.text}`;
        }
    };

    private createMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        const body = { first_name: this.state.first_name, city: this.state.city, object: this.state.object, text: this.state.text };
        const createdMessage = MessageModel.fromJSON(await this.api.postGetJson('/message', body));
        this.state.messages!.push(createdMessage);
        this.setState({ messages: this.state.messages, first_name: '', city: '', text: '' });
    };

    private deleteMessage = async (messageToDelete: MessageModel) => {
        await this.api.delete('/message', messageToDelete.messageId);
        this.setState({ messages: this.state.messages!.filter(message => message !== messageToDelete) });
    };
}
