import { Role } from './role';

export enum Permission {
    createMessage = 'createMessage',
    // deleteMessage = 'deleteMessage',
    manageUsers = 'manageUsers',
    updateMessage = 'updateMessage'
}

export const rolePermission = {
    [Role.admin]: [
        Permission.manageUsers,
        Permission.createMessage,
        // Permission.deleteMessage,
        Permission.updateMessage
    ],

    [Role.user]: [
        Permission.createMessage,
        Permission.updateMessage
    ]
};
