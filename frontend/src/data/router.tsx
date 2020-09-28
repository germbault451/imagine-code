import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Contact } from 'view/contact';
import { Home } from 'view/home';
import { Service } from 'view/service';
import { Team } from 'view/team';

export class Router extends React.Component<{}> {
    public render() {
        return <BrowserRouter>
            <header>
                <section className='bloc-page'>
                    <nav className='nav'>
                        <ul className='flex-grid'>
                            <li><Link to='/'>Accueil</Link></li>
                            <li><Link to='/equipe'>Équipe</Link></li>
                            <li><Link to='/services'>Services</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                        </ul>
                    </nav>
                </section>
            </header>
            <Switch>
                <Route exact={true} path='/'><Home /></Route>
                <Route path='/equipe'><Team /></Route>
                <Route path='/services'><Service /></Route>
                <Route path='/contact'><Contact /></Route>
            </Switch>
        </BrowserRouter>;
    }
}
