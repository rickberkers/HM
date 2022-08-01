import { IAuthRepository } from "../../../repositories/IAuthRepository";

export default class AuthLogoutUseCase {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async invoke(): Promise<void> {
        return await this.authRepository.deleteRefreshToken();
    }
}