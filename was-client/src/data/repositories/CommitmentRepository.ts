import { ICommitmentRepository } from "../../domains/repositories/ICommitmentRepository";
import ICommitmentDataSource from "../datasource/ICommitmentDataSource";

export default class CommitmentRepository implements ICommitmentRepository {

    constructor(
        private dataSource: ICommitmentDataSource
    ) {}

    public async addCommitmentGuests(date: Date, householdId: string, newGuests: string[]): Promise<void> {
        return this.dataSource.addCommitmentGuests(date, householdId, newGuests);
    }
    public async removeCommitmentGuests(date: Date, householdId: string, guests: string[]): Promise<void> {
        return this.dataSource.removeCommitmentGuests(date, householdId, guests);
    }
    public async updateCommitment(date: Date, householdId: string, committed: boolean): Promise<void> {
        return this.dataSource.updateCommitment(date, householdId, committed);
    }
}
