// import { api } from 'api';
// import { IserModel } from 'common';
import { ConnexionForm } from 'component/connexion/connexionform';
import React from 'react';

export class Connexion extends React.Component<{}> {
    public render() {
        return (
            <><section className='header-team' />
                <section className='bloc-page'>
                    <section id='connexionForm'>
                        <ConnexionForm />
                    </section>
                </section></>
        );
    }
}
