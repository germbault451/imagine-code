import { ContactModel, MessageModel, UserModel } from "common";

declare global {
    module Express {
        interface Request {
            message: MessageModel;
            contact: ContactModel;
        }
        interface User extends UserModel { }
    }
}
