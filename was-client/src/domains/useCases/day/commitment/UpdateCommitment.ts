import { ICommitmentRepository } from "../../../repositories/ICommitmentRepository";

export default class UpdateCommitmentUseCase {
    constructor(
        private commitmentRepository: ICommitmentRepository
    ) {}

    async invoke(date: Date, committed: boolean): Promise<void> {
        return await this.commitmentRepository.updateCommitment(date, committed);
    }
}