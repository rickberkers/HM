import { ICommitmentRepository } from "../../domains/repositories/ICommitmentRepository";

export default class CommitmentRepository implements ICommitmentRepository {

    constructor(
        private dataSource: ICommitmentRepository
    ) {}

    public async addCommitmentGuests(day: Date, newGuests: string[]): Promise<void> {
        return this.dataSource.addCommitmentGuests(day, newGuests);
    }
    public async removeCommitmentGuests(day: Date, guests: string[]): Promise<void> {
        return this.dataSource.removeCommitmentGuests(day, guests);
    }
    public async updateCommitment(day: Date, committed: boolean): Promise<void> {
        return this.dataSource.updateCommitment(day, committed);
    }
}
