// import bcrypt from 'bcrypt';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import passport from 'passport';
import { AuthDAO } from '../dao/authdao';
import { wrap } from '../util';


const authRouter = Router();
const authDao = new AuthDAO;

authRouter.post('/login', passport.authenticate('local', {
    session: true
}), (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401);
    }
});

authRouter.post('/logout', wrap(async (req, res) => {
    if (!req.session) { return res.send(); }
    req.session.destroy(err => {
        if (err !== undefined) {
            console.error(`Error destroying session, ${err}`);
        }
    });
    return res.send();
}));

authRouter.post('/user', wrap(async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 12);

    const createdUserId = await authDao.createUser(user);
    if (createdUserId === null) { return res.sendStatus(400); }
    const createdUser = (await authDao.getUserById(createdUserId))!;
    delete createdUser.password;
    return res.send(createdUser);
}));

authRouter.get('/user', wrap(async (req, res) => {
    if (!req.user) { return res.sendStatus(404); }
    return res.send(req.user);
}));

const loginHangler = async (username: string, password: string, done: (error: any, user?: any) => void) => {
    const user = await authDao.getUser(username);

    if (user === undefined) {
        return done(null, false);
    }
    if (await bcrypt.compare(password, user.password!)) {
        delete user.password;
        return done(null, user);
    }
    return done(null, false);
};

export { authRouter, loginHangler };
