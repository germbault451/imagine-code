import { MessageModel, Permission } from 'common';
import { NextFunction, Request, Response, Router } from 'express';
import { MessageDAO } from '../dao/messagedao';
import { wrap } from '../util';

const messageRouter = Router();
const messageDAO = new MessageDAO;

messageRouter.use('/:messageId', wrap(async (req, res, next) => {
    const message = await messageDAO.getMessage(parseInt(req.params.messageId));
    if (message === null) { return res.sendStatus(404); }
    req.message = message;

    return next();
}));

messageRouter.get('/', wrap(async (_req, res) => {
    const messages = await messageDAO.getMessages();
    return res.send(messages);
}));

messageRouter.get('/:messageId', wrap(async (req, res) => {
    return res.send(req.message);
}));

messageRouter.post('/', hasPermission(Permission.createMessage), wrap(async (req, res) => {
    const message = MessageModel.fromJSON(req.body);
    const messageId = await messageDAO.createMessage(message);
    message.created_at = new Date(message.created_at);
    return res.send(await messageDAO.getMessage(messageId));
}));

messageRouter.put('/:messageId', hasPermission(Permission.updateMessage), wrap(async (req, res) => {
    const updated = MessageModel.fromJSON(req.body);
    updated.messageId = req.message.messageId;

    await messageDAO.updateMessage(updated);

    return res.send(await messageDAO.getMessage(req.message.messageId));
}));

messageRouter.delete('/:messageId', hasPermission(Permission.deleteMessage), wrap(async (req, res) => {
    await messageDAO.deleteMessage(req.message.messageId);
    return res.sendStatus(204);
}));

export { messageRouter };
function hasPermission(permission: Permission) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.hasPermission(permission)) {
            return res.sendStatus(403);
        }
        return next();
    };
}
