export interface ICommitmentRepository {
    addCommitmentGuests(date: Date, householdId: string, newGuests: string[]): Promise<void>;
    removeCommitmentGuests(date: Date, householdId: string, guests: string[]): Promise<void>;
    updateCommitment(date: Date, householdId: string, committed: boolean): Promise<void>;
}