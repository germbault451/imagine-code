import { Role } from './role';

export enum Permission {
    createMessage = 'createMessage',
    deleteMessage = 'deleteMessage',
    updateMessage = 'updateMessage'
}

export const rolePermission = {
    [Role.admin]: [
        Permission.createMessage,
        Permission.deleteMessage,
        Permission.updateMessage
    ],

    [Role.user]: [
        Permission.createMessage,
        Permission.updateMessage
    ]
};
