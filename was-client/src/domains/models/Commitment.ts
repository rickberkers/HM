export interface Commitment {
    day: Date,
    guests: null | string[],
    userId: string,
    committed: boolean,
    householdId: string
}