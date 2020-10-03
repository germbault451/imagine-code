import { ContactForm } from 'component/contact/contactform';
import React from 'react';


export class Contact extends React.Component<{}> {
    public render() {
        return (
            <>
                <section className='header' />
                <section className='header-contact' />
                <section className='bloc-page'>
                    <section className='contact-h2'>
                        <h2>Besoin d’en savoir plus?  N’hésitez surtout pas.Notre équipe se fera un réel plaisir de <em>communiquer avec vous</em></h2>
                    </section>
                    <section className='contact-h2'>
                        <p>
                            256 ave.Sud-ouest <br />
                            Subway 16, District 12 <br />
                            Canada <br />
                            418-855-9852 <br />
                            info@imagine.code <br />
                            <br />
                            <iframe id='googlemap' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.660137604199!2d-71.90109378414424!3d46.71243965730687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc770cd6b786eeb%3A0x373506bc1b8c2c06!2s323%20Rue%20des%20Ch%C3%AAnes%2C%20Portneuf%2C%20QC%20G0A%202Y0!5e0!3m2!1sfr!2sca!4v1601563156988!5m2!1sfr!2sca' />
                        </p>
                    </section>
                    <section id='contactform'>
                        <ContactForm />
                    </section>
                </section> </>
        );
    }
}
