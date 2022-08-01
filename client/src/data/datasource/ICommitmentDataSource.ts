export default interface ICommitmentDataSource {
  addCommitmentGuests(day: Date,  householdId: string, newGuests: string[]): Promise<void>;
  removeCommitmentGuests(day: Date,  householdId: string, guests: string[]): Promise<void>;
  updateCommitment(day: Date,  householdId: string, committed: boolean): Promise<void>;
}