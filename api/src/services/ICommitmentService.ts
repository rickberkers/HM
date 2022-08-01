import { Commitment, CommitmentData, CommitmentIds } from "@models/Commitment";

export interface ICommitmentService {
    create(commitmentData: Commitment) : Promise<void>;
    upsert(commitmentData: CommitmentIds & Partial<CommitmentData>) : Promise<void>;
    updateGuests(commitmentIds: CommitmentIds, guests: string[]): Promise<void>;
    get(commitmentIds: CommitmentIds): Promise<Commitment | null>;
}