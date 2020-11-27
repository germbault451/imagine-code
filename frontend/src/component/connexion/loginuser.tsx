import { Api } from 'api';
import { UserModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props { }
interface State {
    username?: string;
    password?: string;
}

export class LoginForm extends React.Component<Props, State> {
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
            return <Redirect to='/services' />;
        }
        return <>
            <section className='header-team' />
            <section className='bloc-page'>
                <section id='connexionForm'>
                    <form className='form' onSubmit={this.login}>
                        <h2 className='title-registerstyle' >Se connecter</h2>
                        <section id='connexionForm'>

                            <input type='text' placeholder='Identifiant' required={true} value={this.state.username ?? ''} onChange={e => { this.setState({ username: e.target.value }); }} /> <br />
                            <input type='password' placeholder='Mots de passe' required={true} value={this.state.password ?? ''} onChange={e => { this.setState({ password: e.target.value }); }} /> <br />

                        </section>
                        <input type='submit' value='Soumettre' />
                    </form>
                    <Link to={`/registeruser`}><button type='button'>Vous n'avez pas de compte! Créer vous en un.</button></Link>
                </section>
            </section>
        </>;
    }

    private login = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const user = UserModel.fromJSON(await this.api.postGetJson('/auth/login',
                { username: this.state.username, password: this.state.password }));
            this.context.setUser(user);
            toast.success('Bienvenu, vous êtes bien connecté.');
        } catch {
            toast.error('Votre nom dulisateur ou mot de passe est invalide.');
        }
    };
}
