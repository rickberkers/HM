export type Commitment = {
    day: string,
    householdId: string,
    userId: string,
    committed: boolean,
    guests: string[],
}

export type UpdateCommitmentData = Omit<Commitment, 'day' | 'householdId' | 'userId'>

export type CommitmentMap = {
    [key: string]: Commitment[],
}