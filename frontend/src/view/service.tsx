// import { BookEditor } from 'component/bookeditor';
import { BookMessageEditor } from 'component/service/messageeditor';
import React from 'react';

export class Service extends React.Component<{}> {
    public render() {
        return (
            <section className='bloc-page'>
                <section>
                    {/* <BookEditor /> */}
                    <BookMessageEditor />
                </section>
            </section>
        );
    }
}
