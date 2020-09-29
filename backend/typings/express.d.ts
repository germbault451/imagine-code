import { BookModel, MessageModel } from "common";

declare global {
    module Express {
        interface Request {
            book: BookModel;
            message: MessageModel;
        }
    }
}
