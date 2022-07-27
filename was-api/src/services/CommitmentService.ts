import { Commitment } from "@entities/Commitment";
import { DataSource } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { ICommitmentService } from "./ICommitmentService";

export default class CommitmentService implements ICommitmentService {

    private commitmentRepo: Repository<Commitment>;

    constructor(private connection: DataSource) {
        this.commitmentRepo = this.connection.getRepository<Commitment>(Commitment);
     }

    updateCommitment(date: Date, householdId: string, committed: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    removeCommitmentGuests(date: Date, householdId: string, guests: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addCommitmentGuests(date: Date, householdId: string, guests: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}