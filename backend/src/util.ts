import { Permission } from 'common';
import { NextFunction, Request, Response } from 'express';

const wrap = (fn => (req, res, next) => fn(req, res, next).catch(next)) as
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) => void;

function hasPermission(permission: Permission) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.hasPermission(permission)) {
            return res.sendStatus(403);
        }
        return next();
    };
}

export { wrap, hasPermission };
