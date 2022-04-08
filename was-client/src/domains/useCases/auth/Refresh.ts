import { AccessToken } from "../../models/Token";
import { IAuthRepository } from "../../repositories/IAuthRepository";

export default class AuthRefreshUseCase {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async invoke(): Promise<AccessToken> {
        return await this.authRepository.refreshToken();
    }
}