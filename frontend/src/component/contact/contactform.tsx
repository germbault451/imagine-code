//import { ContactModel } from 'common';
import React from 'react';
// import React, { FormEvent } from 'react';

interface Props { }
interface State {
    first_name?: string;
    last_name?: string;
    city?: string;
    phone?: string;
    email?: string;
    comments?: string;
    disabled?: boolean;
}

export class ContactForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        const { first_name, last_name, phone, email, comments } = this.state;

        return <>
            <section className='form' id='contactform'>
                <form >
                    <input type='text' placeholder='Nom' required={true} value={last_name ?? ''} onChange={e => { this.setState({ last_name: e.target.value }); }} />
                    <input type='text' placeholder='Prénom' required={true} value={first_name ?? ''} onChange={e => { this.setState({ first_name: e.target.value }); }} />
                    <input type='text' placeholder='Numéro de téléphone' required={true} value={phone ?? ''} onChange={e => { this.setState({ phone: e.target.value }); }} />
                    <input type='email' placeholder='Courriel' required={true} value={email ?? ''} onChange={e => { this.setState({ email: e.target.value }); }} />
                    <textarea placeholder='Inscrire votre commentaire ici' required={true} value={comments ?? ''} onChange={e => { this.setState({ comments: e.target.value }); }} />
                    <input type='submit' value='Envoyé' />
                </form>
            </section>
        </>;
    }
}
