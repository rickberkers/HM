import { AccessToken } from "../../domains/models/Token";
import { IAuthRepository } from "../../domains/repositories/IAuthRepository";
import IAuthDataSource from "../datasource/IAuthDataSource";

export default class AuthRepository implements IAuthRepository {

    constructor(
        private dataSource: IAuthDataSource
    ) {}

    async getToken(username: string, password: string): Promise<AccessToken> {
        return await this.dataSource.login(username, password);
    }
    async refreshToken(): Promise<AccessToken> {
        return await this.dataSource.refresh();
    }
    async deleteRefreshToken(): Promise<void> {
        await this.dataSource.logout();
    }
}
