export type CommitmentIds = {
    day: string,
    householdId: string,
    userId: string,
};

export type CommitmentData = {
    committed: boolean,
    guests: string[],
}

export type Commitment = CommitmentIds & CommitmentData;

export type CommitmentMap = {
    [key: string]: Commitment[],
};

export const defaultCommitmentData = {
    committed: false,
    guests: []
};