import { MessageModel, UserModel } from "common";

declare global {
    module Express {
        interface Request {
            message: MessageModel;
            user: UserModel;
        }
    }
}
