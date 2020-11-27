import { Role } from './role';

export enum Permission {
    createMessage = 'createMessage',
<<<<<<< HEAD
    deleteMessage = 'deleteMessage',
=======
    // deleteMessage = 'deleteMessage',
    manageUsers = 'manageUsers',
>>>>>>> production
    updateMessage = 'updateMessage'
}

export const rolePermission = {
    [Role.admin]: [
<<<<<<< HEAD
        Permission.createMessage,
        Permission.deleteMessage,
=======
        Permission.manageUsers,
        Permission.createMessage,
        // Permission.deleteMessage,
>>>>>>> production
        Permission.updateMessage
    ],

    [Role.user]: [
        Permission.createMessage,
        Permission.updateMessage
    ]
};
