// import { UserModel } from 'common';
// import { Router } from 'express';
// import { UserDAO } from '../dao/userdao';
// import { wrap } from '../util';

// const userRouter = Router();
// const userDAO = new UserDAO;

// userRouter.use('/:userId', wrap(async (req, res, next) => {
//     const user = await userDAO.getUser(parseInt(req.params.userId));
//     if (user === null) { return res.sendStatus(404); }
//     req.registeruser = user;

//     return next();
// }));

// userRouter.get('/', wrap(async (_req, res) => {
//     const users = await userDAO.getUsers();
//     return res.send(users);
// }));

// userRouter.get('/:userId', wrap(async (req, res) => {
//     return res.send(req.registeruser);
// }));

// userRouter.post('/', wrap(async (req, res) => {
//     const user = UserModel.fromJSON(req.body);
//     const userId = await userDAO.createUser(user);
//     user.created_at = new Date(user.created_at);
//     return res.send(await userDAO.getUser(userId));
// }));

// userRouter.put('/:userId', wrap(async (req, res) => {
//     const updated = UserModel.fromJSON(req.body);
//     updated.userId = req.registeruser.userId;

//     await userDAO.updateUser(updated);

//     return res.send(await userDAO.getUser(req.registeruser.userId));
// }));

// // userRouter.delete('/:userId', wrap(async (req, res) => {
// //     await userDAO.deleteUser(req.user.userId);
// //     return res.sendStatus(204);
// // }));

// export { userRouter };
