import { MessageModel } from 'common';
import { DBProvider } from '../dbprovider';

export class MessageDAO {
    private knex = DBProvider.getKnexConnection();

    public async createMessage(message: MessageModel) {
        const { first_name, city, object, text, created_at } = message;
        const [messageId] = await this.knex('message').insert({
            first_name, city, object, text, created_at
        });
        return messageId;
    }

    public async getMessage(messageId: number | string) {
        const message = await this.knex('message').first('*').where({ messageId });
        if (!message) { return null; }
        return MessageModel.fromJSON(message);
    }

    public async updateMessage(message: MessageModel) {
        const { messageId, first_name, city, object, text } = message;
        await this.knex('message').update({ first_name, city, object, text }).where({ messageId });
    }

    public async deleteMessage(messageId: number) {
        await this.knex('message').delete().where({ messageId });
    }

    public async getMessages() {
        const messages = await this.knex('message').select('*');

        return messages.map(MessageModel.fromJSON);
    }
}
