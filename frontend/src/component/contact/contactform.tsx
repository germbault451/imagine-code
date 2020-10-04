import { Api } from 'api';
import { ContactModel } from 'common';
import React from 'react';

interface Props { }
interface State {
    contact?: ContactModel[];
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    comments?: string;
}

export class ContactForm extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
        const contact = (await this.api.getJson('/contact') as any[]).map(ContactModel.fromJSON);
        this.setState({ contact });
    }

    public render() {
        // const { contacts } = this.state;
        // if (!contacts) { return 'Chargement...'; }

        return <>
            <section className='form' id='contactform'>
                <form onSubmit={this.createdMessageContact} >
                    <input type='text' placeholder='Nom' required={true} value={this.state.last_name ?? ''} onChange={e => { this.setState({ last_name: e.target.value }); }} />
                    <input type='text' placeholder='Prénom' required={true} value={this.state.first_name ?? ''} onChange={e => { this.setState({ first_name: e.target.value }); }} />
                    <input type='text' placeholder='Numéro de téléphone' required={true} value={this.state.phone ?? ''} onChange={e => { this.setState({ phone: e.target.value }); }} />
                    <input type='email' placeholder='Courriel' required={true} value={this.state.email ?? ''} onChange={e => { this.setState({ email: e.target.value }); }} />
                    <textarea placeholder='Inscrire votre commentaire ici' required={true} value={this.state.comments ?? ''} onChange={e => { this.setState({ comments: e.target.value }); }} />
                    <input className='button' type='submit' value='Envoyé' />
                </form>
            </section>
        </>;

    }

    private createdMessageContact = async (event: React.FormEvent) => {
        event.preventDefault();
        const sendingForm = { last_name: this.state.last_name, first_name: this.state.first_name, phone: this.state.phone, email: this.state.email, comments: this.state.comments };
        const createdSendingForm = ContactModel.fromJSON(await this.api.postGetJson('/contact', sendingForm));
        this.state.contact!.push(createdSendingForm);
        this.setState({ contact: this.state.contact, last_name: '', first_name: '', phone: '', email: '', comments: '' });
        return alert(' Houra! Nous avons bien reçu ton message. :)');
    };
};
