import { UserModel } from 'common';
import { DBProvider } from '../dbprovider';

export class UserDAO {

    private knex = DBProvider.getKnexConnection();

    public async getUser(userId: number | string, message_id: number) {
        const user = await this.knex('user').first('userId', 'first_name').where({ message_id, userId });
        if (!user) { return null; }
        return UserModel.fromJSON(user);
    }

    public async getUsers(message_id: number) {
        const users = await this.knex('user').select('userId', 'first_name').where({ message_id });

        return users.map(UserModel.fromJSON);
    }

    public async createUser(user: UserModel, message_Id: number) {
        const { first_name } = user;
        const [userId] = await this.knex('user').insert({ first_name, message_Id });

        return userId;
    }

    public async deleteUser(userId: number) {
        await this.knex('user').delete().where({ userId });
    }
}
