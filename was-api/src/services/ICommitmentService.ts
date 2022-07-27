import { Commitment, CommitmentIds } from "@models/Commitment";

export interface ICommitmentService {
    create(commitmentData: Commitment) : Promise<void>;
    upsert(commitmentData: Commitment) : Promise<void>;
    updateGuests(commitmentIds: CommitmentIds, guests: string[]): Promise<void>;
    get(commitmentIds: CommitmentIds): Promise<Commitment | null>;
}