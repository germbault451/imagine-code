import { BookModel } from "common";

declare global {
    module Express {
        interface Request {
            book: BookModel;
        }
    }
}
