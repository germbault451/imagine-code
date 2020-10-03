export class ContactModel {
    public contactId: number;
    public first_name: string;
    public last_name: string;
    public phone: string;
    public email: string;
    public comments: string;

    public static fromJSON(jsonMessageModel: ContactModel) {
        const messageModel = new ContactModel;
        Object.assign(messageModel, jsonMessageModel);
        return messageModel;
    }
}
