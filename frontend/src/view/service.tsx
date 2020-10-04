import { MessageEditor } from 'component/service/messageeditor';
import React from 'react';

export class Service extends React.Component<{}> {
    public render() {
        return (
            <><section className='header-service' />
                <section className='bloc-page'>
                    <section>
                        <br />
                        <MessageEditor />
                    </section>
                </section>
            </>
        );
    }
}
