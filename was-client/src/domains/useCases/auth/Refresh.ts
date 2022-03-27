import { UserToken } from "../../models/Token";
import { IAuthRepository } from "../../repositories/IAuthRepository";

export default class AuthRefreshUseCase {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async invoke(): Promise<UserToken> {
        return await this.authRepository.getAccesToken();
    }
}