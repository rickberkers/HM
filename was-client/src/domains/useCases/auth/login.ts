import { IAuthRepository } from "../../repositories/IAuthRepository";

export interface Login {
    invoke(): Promise<void>;
}
  
export class LoginUseCase implements Login {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async invoke(): Promise<void> {
        // return this.authRepository;
        return;
    }
}