import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<{}> {
    public render() {
        return (
            <><section className='header-home' />
                <section className='homeSection'>
                    <h1>Offrez une activité technologique aux élèves de votre classe</h1>
                    <section className='bloc-page'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Facilisis id purus consectetur lorem nec.Tortor eget sed risus tincidunt ultricies vel.Ornare ultrices sit vitae nunc.Sodales posuere ut et, feugiat urna odio mauris.Morbi hac ultrices viverra ultrices tellus, odio turpis sociis.Quam etiam viverra tortor orci hendrerit massa eget turpis.Egestas quis semper ut pharetra cursus tempus nulla amet, sit.
                       <br />
                            <Link className='color__link' to={`/services`}><button className='button'>Voir nos services</button></Link>

                        </p>
                    </section>
                </section>
            </>
        );
    }
}
