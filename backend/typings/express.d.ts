import { ContactModel, MessageModel, UserModel } from "common";

declare global {
    module Express {
        interface Request {
            message: MessageModel;
            registeruser: UserModel;
            contact: ContactModel;
        }
        interface User extends UserModel { }
    }
}
