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
            {messages.map(message => <div key={message.messageId}>{message.first_name} {message.city} {message.object} {this.getMessageCount(message)}</div>)}
            <BookCreationMessageForm addMessage={message => {
                messages.push(message);
                this.setState({ messages });
            }} />
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
