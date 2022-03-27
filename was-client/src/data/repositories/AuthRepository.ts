import { UserToken } from "../../domains/models/Token";
import { IAuthRepository } from "../../domains/repositories/IAuthRepository";
import IAuthDataSource from "../datasource/IAuthDataSource";

export default class AuthRepository implements IAuthRepository {

    constructor(
        private dataSource: IAuthDataSource
    ) {}

    async getRefreshToken(username: string, password: string): Promise<UserToken> {
        return await this.dataSource.login(username, password);
    }
    async getAccesToken(): Promise<UserToken> {
        return await this.dataSource.refresh();
    }
    async deleteRefreshToken(): Promise<void> {
        await this.dataSource.logout();
    }
}
