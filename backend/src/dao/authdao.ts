import { Role, UserModel } from 'common';
import { DBProvider } from '../dbprovider';

export class AuthDAO {
    private knex = DBProvider.getKnexConnection();

    public async getUser(username: string) {
        const user: UserModel | undefined = await this.knex('user').first('userId', 'username', 'password',).where({ username });
        if (!user) { return user; }
        await this.hydrate(user);
        return user;
    }

    public async getUserById(userId: number) {
        const user: UserModel | undefined = await this.knex('user').first('userId', 'username', 'password',).where({ userId });
        if (!user) { return user; }
        await this.hydrate(user);
        return user;
    }

    /**
     * Hydrate: Réfer un processus de remplir un objet avec des données
     */
    private async hydrate(user: UserModel) {
        const userId = user.userId;
        const roles: Role[] = await this.knex('role').pluck('role').where({ userId });
        user.roles = roles;
        return user;
    }

}
