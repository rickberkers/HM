export default interface ICommitmentDataSource {
  addCommitmentGuests(day: Date, newGuests: string[]): Promise<void>;
  removeCommitmentGuests(day: Date, guests: string[]): Promise<void>;
  updateCommitment(day: Date, committed: boolean): Promise<void>;
}