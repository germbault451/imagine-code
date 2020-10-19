import { Api } from 'api';
import { MessageModel } from 'common';
import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps<{ messageId: string; }> { }
interface State {
    message?: MessageModel | null;
    currentMessageId?: number;
}
export class ViewMessage extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public async componentDidMount() {
        await this.componentDidUpdate();
    }

    public async componentDidUpdate() {
        const newCurrentMessageId = parseInt(this.props.match.params.messageId);
        if (this.state.currentMessageId === newCurrentMessageId) { return; }
        try {
            const message = MessageModel.fromJSON(await this.api.getJson(`/message/${newCurrentMessageId}`));
            this.setState({ message, currentMessageId: newCurrentMessageId });
        } catch {
            this.setState({ message: null, currentMessageId: newCurrentMessageId });
        }
    }

    public render() {
        const currentMessageId = parseInt(this.props.match.params.messageId);
        const { message } = this.state;
        if (message === undefined) { return 'Chargement...'; }
        if (message === null) {
            return <Redirect to='/services' />;
        }

        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

        return <>
            <section className='header-service' />
            <section className='bloc-page'>
                <section>
                    <br />
                    <section className='background__message'>
                        <section key={message.messageId} className='ajust'>
                            <p className='color-01 strong'>{message.first_name}, de: {message.city}</p>
                            <p className='color-01'>Object: {message.object}</p>
                            <p className='color-01'>{this.getMessageCount(message)}</p>
                            <section className='space'>
                                <p className='color-01'>Publié le: {message.created_at.toLocaleDateString('fr-CA', dateFormat)}</p>
                            </section>
                        </section>
                    </section>
                </section>
                {this.renderLinks(currentMessageId)}
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

    private renderLinks(currentMessageId: number) {
        return <>
            <Link className='color__link' to={`/${currentMessageId - 1}`}><button type='button'>Précédent</button></Link>
            <Link className='color__link' to={`/${currentMessageId + 1}`}><button type='button'>Suivant</button></Link>
            <Link className='color__link' to={`/services`}><button type='button'>Retour</button></Link>
        </>;
    }
}
