export type Commitment = {
    day: string,
    committed: boolean,
    guests: string[]
}

export type CommitmentMap = {
    [key: string]: Commitment[],
}