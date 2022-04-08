import { AccessToken } from "../../models/Token";
import { IAuthRepository } from "../../repositories/IAuthRepository";

export default class AuthLoginUseCase {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async invoke(username: string, password: string): Promise<AccessToken> {
        return await this.authRepository.getToken(username, password);
    }
}