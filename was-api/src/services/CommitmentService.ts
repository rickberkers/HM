import { Commitment as CommitmentEntity } from "@entities/Commitment";
import { Commitment, CommitmentIds} from "@models/Commitment";
import { arrayDifference } from "@utils/array";
import { DataSource } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { ICommitmentService } from "./ICommitmentService";

export default class CommitmentService implements ICommitmentService {

    private commitmentRepo: Repository<CommitmentEntity>;

    constructor(private connection: DataSource) {
        this.commitmentRepo = this.connection.getRepository<CommitmentEntity>(CommitmentEntity);
    }

    public async upsert(commitmentData: Commitment): Promise<void> {
        await this.commitmentRepo.upsert(commitmentData, {
            conflictPaths: ["userId", "householdId", "day"],
            skipUpdateIfNoValuesChanged: true,
        })
        return;
    }

    public async create(commitmentData: Commitment): Promise<void> {
        await this.commitmentRepo.insert(commitmentData);
    }

    public async get(commitmentIds: CommitmentIds): Promise<Commitment | null> {
        return this.commitmentRepo.findOne({where: commitmentIds})
    }
    
    public async updateGuests(commitmentIds: CommitmentIds, guests: string[]): Promise<void> {
        await this.commitmentRepo.update(commitmentIds, {guests});
        return;
    }
}