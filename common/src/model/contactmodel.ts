export class ContactModel {
    public contactId: number;
    public first_name: string;
    public last_name: string;
    public object: string;
    public comments: string;
    public created_at: Date;
    // public updated_at: Date;

    public static fromJSON(jsonMessageModel: ContactModel) {
        const messageModel = new ContactModel;
        Object.assign(messageModel, jsonMessageModel);
        // ContactModel.created_at = new Date(ContactModel.created_at);
        return ContactModel;
    }
}
