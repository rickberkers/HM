import { ICommitmentRepository } from "../../../repositories/ICommitmentRepository";

export default class AddCommitmentGuestsUseCase {
    constructor(
        private commitmentRepository: ICommitmentRepository
    ) {}

    async invoke(date: Date, householdId: string, newGuests: string[]): Promise<void> {
        return await this.commitmentRepository.addCommitmentGuests(date, householdId, newGuests);
    }
}