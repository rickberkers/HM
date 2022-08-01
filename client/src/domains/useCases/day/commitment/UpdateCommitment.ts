import { ICommitmentRepository } from "../../../repositories/ICommitmentRepository";

export default class UpdateCommitmentUseCase {
    constructor(
        private commitmentRepository: ICommitmentRepository
    ) {}

    async invoke(date: Date, householdId: string, committed: boolean): Promise<void> {
        return await this.commitmentRepository.updateCommitment(date, householdId, committed);
    }
}