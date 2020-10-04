import { MessageEditor } from 'component/service/messageeditor';
import { ViewMessage } from 'component/service/viewmessage';
import { BASE_HREF } from 'config.json';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Connexion } from 'view/connexion';
import { Contact } from 'view/contact';
import { Home } from 'view/home';
import { Team } from 'view/team';

interface Props { }
interface State { }

export class Router extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return <BrowserRouter basename={BASE_HREF}>
            <header>
                <section className='bloc-page'>
                    <nav className='nav'>
                        <ul className='flex-grid'>
                            <Link className='logo' to={`/home`}><img src='../../img/logo.png' alt='logo' /></Link>
                            <li><Link to='/'>Accueil</Link></li>
                            <li><Link to='/equipe'>Équipe</Link></li>
                            <li><Link to='/services'>Services</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            <li><Link to='/connexion'>Connexion</Link></li>
                        </ul>
                    </nav>
                </section>
            </header>
            <Switch>
                <Route path='/equipe' component={Team} />
                <Route path='/services' component={MessageEditor} />
                <Route path='/contact' component={Contact} />
                <Route path='/connexion' component={Connexion} />
                <Route path='/:messageId' component={ViewMessage} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>;
    }
}
