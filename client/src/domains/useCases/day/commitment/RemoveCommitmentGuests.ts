import { ICommitmentRepository } from "../../../repositories/ICommitmentRepository";

export default class RemoveCommitmentGuestsUseCase {
    constructor(
        private commitmentRepository: ICommitmentRepository
    ) {}

    async invoke(date: Date, householdId: string, guests: string[]): Promise<void> {
        return await this.commitmentRepository.removeCommitmentGuests(date, householdId, guests);
    }
}