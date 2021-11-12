export default interface ICommitment {
    day: string,
    committed: boolean,
    guests: string[]
}

export interface ICommitmentMap {
    [key: string]: ICommitment[],
}