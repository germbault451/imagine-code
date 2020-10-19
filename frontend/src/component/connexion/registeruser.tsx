import { Api } from 'api';
import { UserModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props { }
interface State {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

export class RegisterForm extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        if (this.context.user === undefined) { return null; }
        if (this.context.user) {
            return <Redirect to='/connexion' />;
        }
        return <>
            <section className='header-team' />
            <section className='bloc-page'>
                <section id='connexionForm'>
                    <section className='form'>
                        <h2 className='title-registerstyle' >Créer votre compte</h2>
                        <form className='registerStyle' onSubmit={this.register}>

                            <input type='text' placeholder='Username' value={this.state.username ?? ''} onChange={e => { this.setState({ username: e.target.value }); }} />
                            <input type='text' placeholder='Prénom' value={this.state.first_name ?? ''} onChange={e => { this.setState({ first_name: e.target.value }); }} />
                            <input type='text' placeholder='Nom' value={this.state.last_name ?? ''} onChange={e => { this.setState({ last_name: e.target.value }); }} />
                            <input type='email' placeholder='Courriel' value={this.state.email ?? ''} onChange={e => { this.setState({ email: e.target.value }); }} />
                            <input type='password' placeholder='Mot de passe' value={this.state.password ?? ''} onChange={e => { this.setState({ password: e.target.value }); }} />

                            <input type='submit' value='Envoyé' />
                        </form>
                    </section>
                </section>
            </section>
        </>;
    }

    private register = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const user = UserModel.fromJSON(await this.api.postGetJson('/auth/user',
                { username: this.state.username, first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password }));
            this.context.setUser(user);
            toast.success('Bienvenu, votre compte à été crée.');
        } catch {
            toast.error('Votre nom dulisateur est déja utilisé.');
        }
    };
}
