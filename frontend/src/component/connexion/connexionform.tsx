import React from 'react';

interface Props { }
interface State { username?: string; password?: string; }

export class ConnexionForm extends React.Component<Props, State> {

    //     constructor(Props: Props) {
    // super(Props);

    // this.state = {};
    //     }

    public render() {
        return <>
            <form className='form'>
                <section id='connexionForm'>
                    <input type='text' placeholder='Identifiant' /> <br />
                    <input type='password' placeholder='Mots de passe' />
                    <br />
                    <input type='button' value='submit' />
                </section>
            </form>


            {/* <input type='text' value={this.state.username ?? ''} onChange={e => {
                         this.setState({ username: e.target.value });
                     }}/>
                    <input type='text' value={this.state.username ?? ''} onChange={e => {
                        this.setState({ username: e.target.value });
                     }}/>
                 <input type='button' value='submit'/>
             </form>
             </section> */}
        </>
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
