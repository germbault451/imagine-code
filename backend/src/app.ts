import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import { contactRouter } from './router/contactrouter';
import { messageRouter } from './router/messagerouter';
import { userRouter } from './router/userrouter';

const app = express();

app.set('trust proxy', 'loopback');

app.use(errorHandler({ log: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((_req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use('/message', messageRouter);
app.use('/user', userRouter);
app.use('/contact', contactRouter);

export { app };
