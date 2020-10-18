import { Api } from 'api';
import { UserModel } from 'common';
import React from 'react';

interface Props { }
interface State {
    user?: UserModel[];
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

export class RegisterForm extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
        const user = (await this.api.getJson('/user') as any[]).map(UserModel.fromJSON);
        this.setState({ user });
    }

    public render() {
        const { user } = this.state;
        if (!user) { return 'Chargement...'; }
        return <>
            <section className='header-team' />
            <section className='bloc-page'>
                <section id='connexionForm'>
                    <section className='form'>
                        <h2 className='title-registerstyle' >Créer votre compte</h2>
                        <form className='registerStyle' onSubmit={this.createUser}>

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

    private createUser = async (event: React.FormEvent) => {
        event.preventDefault();
        const body = { username: this.state.username, first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password };
        const createdMessage = UserModel.fromJSON(await this.api.postGetJson('/user', body));
        this.state.user!.push(createdMessage);
        this.setState({ user: this.state.user, username: '', first_name: '', last_name: '', email: '', password: '' });
    };
}
