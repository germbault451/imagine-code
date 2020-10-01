import { MessageModel } from 'common';
import React from 'react';
import { BookCreationMessageForm } from './messagecreationform';

interface Props { }
interface State {
    messages?: MessageModel[];
}

export class BookMessageEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
        const messages = (await (await fetch('/api/message')).json() as any[]).map(MessageModel.fromJSON);
        this.setState({ messages });
    }

    public render() {
        const { messages } = this.state;
        if (!messages) { return 'Chargement...'; }

        return <>
            <section className='background__message'>
                <h2>Ce que les gens en pensent</h2>
                {messages.map(message =>
                    <section key={message.messageId} className='ajust'>
                        <p className='color-01 strong'>{message.first_name}, de: {message.city}<span>x</span></p>
                        <p className='color-01'>Object: {message.object}</p>
                        <p className='color-01'>{this.getMessageCount(message)}</p>
                        <section className='space'>
                            <p className='color-01'>Publié le: {message.created_at.toString()}</p>
                            <input className='bottom' type='submit' value='Lire plus' />
                        </section>
                    </section>)}
            </section>

            <section>
                <BookCreationMessageForm addMessage={message => {
                    messages.push(message);
                    this.setState({ messages });
                }} />
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
}
