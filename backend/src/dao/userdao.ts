// import bcrypt from 'bcrypt';
import { UserModel } from 'common';
import { DBProvider } from '../dbprovider';

export class UserDAO {
    private knex = DBProvider.getKnexConnection();

    public async createUser(user: UserModel) {
        // const saltRounds = 12;
        const { username, first_name, last_name, email, password } = user;
        // const hash = await bcrypt.hash(password, saltRounds);
        const [userId] = await this.knex('user').insert({
            username, first_name, last_name, email, password
        });
        return userId;
    }

    public async getUser(userId: number | string) {
        const user = await this.knex('user').first('*').where({ userId });
        if (!user) { return null; }
        return UserModel.fromJSON(user);
    }

    public async getUsers() {
        const users = await this.knex('user').select('*');

        return users.map(UserModel.fromJSON);
    }

    public async updateUser(user: UserModel) {
        const { userId, username, first_name, last_name, email, password } = user;
        await this.knex('user').update({ username, first_name, last_name, email, password }).where({ userId });
    }

    // public async deleteUser(userId: number) {
    //     await this.knex('user').delete().where({ userId });
    // }
}
