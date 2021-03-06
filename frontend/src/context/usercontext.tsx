import { Api } from 'api';
import { UserModel } from 'common';
import React from 'react';

export interface UserContext {
    user?: UserModel | null;
    reloadUser(): Promise<UserModel | null>;
    setUser(user: UserModel | null): void;
}

export const UserContext: React.Context<UserContext> = React.createContext({
    reloadUser: async () => null,
    setUser: () => { }
} as UserContext);

export class UserContextComponent extends React.Component<{}, UserContext> {
    public api = new Api;

    constructor(props: {}) {
        super(props);
        this.state = {
            reloadUser: this.reloadUser,
            setUser: this.setUser
        };
    }

    public setUser = (user: UserModel | null) => {
        this.setState({ user });
    };

    public reloadUser = async () => {
        try {
            const user = UserModel.fromJSON(await this.api.getJson('/auth/user'));
            this.setState({ user });
            return user;
        } catch {
            console.log('Error obtaining user, logging out.');
            this.setState({ user: null });
            return null;
        }
    };

    public async componentDidMount() {
        await this.reloadUser();
    }

    public render() {
        if (this.state.user === undefined) { return null; }
        return <UserContext.Provider value={this.state}>
            {this.props.children}
        </UserContext.Provider>;

    }
}
