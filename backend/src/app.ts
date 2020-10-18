import bodyParser from 'body-parser';
import { UserModel } from 'common';
import errorHandler from 'errorhandler';
import express from 'express';
import MySQLStore from 'express-mysql-session';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { config } from './config';
import { AuthDAO } from './dao/authdao';
import { authRouter, loginHangler } from './router/authrouter';
import { contactRouter } from './router/contactrouter';
import { messageRouter } from './router/messagerouter';
import { userRouter } from './router/userrouter';

const authDAO = new AuthDAO;

const sessionStore = new (MySQLStore(session as any))({
    host: config.database.url,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database + '_session'
});

const app = express();

app.set('trust proxy', 'loopback');

app.use(session({
    name: 'code_session',
    secret: 'oIA6VpPDtfSYNh2AX*r',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandler({ log: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((_req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

passport.serializeUser((user: UserModel, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (userId: number, done) => {
    const user = await authDAO.getUserById(userId);
    delete user!.password;
    done(null, user ? UserModel.fromJSON(user) : undefined);
});

passport.use(new Strategy(loginHangler));

app.use('/message', messageRouter);
app.use('/user', userRouter);
app.use('/contact', contactRouter);
app.use('/auth', authRouter);

export { app };
