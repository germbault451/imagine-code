import { UserModel } from 'common';
import { Router } from 'express';
import { UserDAO } from '../dao/userdao';
import { wrap } from '../util';



const userRouter = Router();
const userDAO = new UserDAO;

userRouter.use('/:userId', wrap(async (req, res, next) => {
    const user = await userDAO.getUser(req.params.userId, req.message.messageId);
    if (user === null) { return res.sendStatus(404); }
    req.user = user;

    return next();
}));

userRouter.get('/:userId', wrap(async (req, res) => {
    return res.send(req.user);
}));

userRouter.get('/', wrap(async (req, res) => {
    const users = await userDAO.getUsers(req.message.messageId);
    return res.send(users);
}));

userRouter.post('/', wrap(async (req, res) => {
    const user = UserModel.fromJSON(req.body);
    const userId = await userDAO.createUser(user, req.message.messageId);
    return res.send(await userDAO.getUser(userId, req.message.messageId));
}));

// userRouter.put('/:userId', wrap(async (req, res) => {
//     const updated = UserModel.fromJSON(req.body);
//     updated.userId = req.user.userId;

//     await userDAO.updateMessage(updated);

//     return res.send(await userDAO.getUser(req.user.userId));
// }));

userRouter.delete('/:userId', wrap(async (req, res) => {
    await userDAO.deleteUser(req.user.userId);
    return res.sendStatus(204);
}));

export { userRouter };
