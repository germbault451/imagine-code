// import { BookEditor } from 'component/bookeditor';
import { Router } from 'data/router';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

Modal.setAppElement('#coreContainer');

ReactDOM.render(
    < Router />,
    document.getElementById('coreContainer')
);
