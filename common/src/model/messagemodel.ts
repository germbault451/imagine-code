export class MessageModel {
    public messageId: number;
    public first_name: string;
    public city: string;
    public object: string;
    public text: string;
    public created_at: Date;
    // public updated_at: Date;

    public static fromJSON(jsonMessageModel: MessageModel) {
        const messageModel = new MessageModel;
        Object.assign(messageModel, jsonMessageModel);
        messageModel.created_at = new Date(messageModel.created_at);
        return messageModel;
    }
}
