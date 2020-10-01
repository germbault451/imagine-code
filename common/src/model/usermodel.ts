import { Role } from '../enum/role';

export class UserModel {
    public userId: number;
    public first_name: string;
    // public email: string;
    public created_at: Date;

    public roles: Role[];

    constructor() {
        this.roles = [];
    }

    public static fromJSON(jsonUserModel: UserModel) {
        const userModel = new UserModel;
        Object.assign(userModel, jsonUserModel);
        return userModel;
    }
}
