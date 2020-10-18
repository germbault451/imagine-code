// import { BookEditor } from 'component/bookeditor';
import { UserContextComponent } from 'context/usercontext';
import { Router } from 'data/router';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

Modal.setAppElement('#coreContainer');

ReactDOM.render(
    <UserContextComponent>
        < Router />,
    </UserContextComponent>,
    document.getElementById('coreContainer')
);
