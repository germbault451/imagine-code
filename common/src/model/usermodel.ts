import { Role } from '../enum/role';

export class UserModel {
    public userId: number;
    public name: string;
    public email: string;
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
