import React from 'react';
import { Link } from 'react-router-dom';

interface Props { }
interface State { username?: string; password?: string; }

export class LoginForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        return <><section className='header-team' />
            <section className='bloc-page'>
                <section id='connexionForm'>
                    <form className='form'>
                        <h2 className='title-registerstyle' >Se connecter</h2>
                        <section id='connexionForm'>
                            <input type='text' placeholder='Identifiant' /> <br />
                            <input type='password' placeholder='Mots de passe' />
                            <br />
                            <input type='button' value='submit' />
                        </section>
                    </form>
                    <Link to={`/user`}><button type='button'>Vous n'avez pas de compte! Créer vous en un.</button></Link>
                </section>
            </section>



            {/* <input type='text' value={this.state.username ?? ''} onChange={e => {
                         this.setState({ username: e.target.value });
                     }}/>
                    <input type='text' value={this.state.username ?? ''} onChange={e => {
                        this.setState({ username: e.target.value });
                     }}/>
                 <input type='button' value='submit'/>
             </form>
             </section> */}
        </>;
    }
}
//     private login = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const user = UserModel.from.JSON(await this.api.postGetJson('/auth/login', {username: this.state.username, password: this.state.password})
//             console.log(user));
//             } catch {
//             }
//         }
//     }
