import { Permission, rolePermission } from '../enum';
import { Role } from '../enum/role';

export class UserModel {
    public userId: number;
    public username: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password?: string;
    public created_at: Date;
    public roles: Role[];

    constructor() {
        // this.roles = [];
    }

    public static fromJSON(jsonUserModel: UserModel) {
        const userModel = new UserModel;
        Object.assign(userModel, jsonUserModel);
        userModel.created_at = new Date(userModel.created_at);
        return userModel;
    }

    public hasPermission(permission: Permission) {
        return this.roles.some(role => {
            return rolePermission[role].includes(permission);
        });
    }
}
