import { UserToken } from "../../models/Token";
import { IAuthRepository } from "../../repositories/IAuthRepository";

export default class AuthLoginUseCase {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async invoke(username: string, password: string): Promise<UserToken> {
        return await this.authRepository.getRefreshToken(username, password);
    }
}