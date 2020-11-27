import { LoginForm } from 'component/connexion/loginuser';
import { LogoutForm } from 'component/connexion/logoutuser';
import { RegisterForm } from 'component/connexion/registeruser';
import { MessageEditor } from 'component/service/messageeditor';
import { ViewMessage } from 'component/service/viewmessage';
import { BASE_HREF } from 'config.json';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Contact } from 'view/contact';
import { Home } from 'view/home';
import { Team } from 'view/team';

interface Props { }
interface State { }

export class Router extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return <BrowserRouter basename={BASE_HREF}>
            <header>

                <section className='bloc-page'>
                    <nav className='nav'>
                        <ul className='flex-grid'>
                            <Link className='logo' to={`/`}><img src='../../img/logo.png' alt='logo' /></Link>
                            <li><Link to='/'>Accueil</Link></li>
                            <li><Link to='/equipe'>Équipe</Link></li>
                            <li><Link to='/services'>Services</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            <li><Link to='/connexion'>Connexion</Link></li>
                            {this.context.user && <LogoutForm />}
                        </ul>
                        <ToastContainer />
                    </nav>
                </section>
            </header>
            <Switch>
                <Route path='/registeruser' component={RegisterForm} />
                <Route path='/equipe' component={Team} />
                <Route path='/services' component={MessageEditor} />
                <Route path='/contact' component={Contact} />
                <Route path='/connexion' component={LoginForm} />
                <Route path='/:messageId' component={ViewMessage} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>;
    }
}
