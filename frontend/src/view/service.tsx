import { BookEditor } from 'component/bookeditor';
import React from 'react';

export class Service extends React.Component<{}> {
    public render() {
        return (
            <section className='bloc-page'>
                <div>
                    <h2>Page Services (Les services) </h2>
                </div>
                <section>
                    <BookEditor />
                </section>
            </section>
        );
    }
}
