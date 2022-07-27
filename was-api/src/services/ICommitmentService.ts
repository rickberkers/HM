export interface ICommitmentService {
    updateCommitment(date: Date, householdId: string, committed: boolean) : Promise<void>;
    removeCommitmentGuests(date: Date, householdId: string, guests: string[]) : Promise<void>;
    addCommitmentGuests(date: Date, householdId: string, guests: string[]) : Promise<void>;
}