import { Role } from './role';

export enum Permission {
    createMessage = 'createMessage',
    deleteMessage = 'deleteMessage'
}

export const rolePermission = {
    [Role.admin]: [
        Permission.createMessage,
        Permission.deleteMessage
    ],

    [Role.user]: [
        Permission.createMessage
    ]
};
