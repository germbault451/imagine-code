// import { BookEditor } from 'component/bookeditor';
import { BookMessageEditor } from 'component/messageeditor';
import React from 'react';

export class Service extends React.Component<{}> {
    public render() {
        return (
            <section className='bloc-page'>
                <section>
                    <h2>Page Services (Les services) </h2>
                </section>
                <section>
                    {/* <BookEditor /> */}
                    <BookMessageEditor />
                </section>
            </section>
        );
    }
}
