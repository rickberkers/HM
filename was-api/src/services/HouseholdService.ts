import { DataSource, Repository } from "typeorm";
import { IHouseholdService } from "./IHouseholdService";
import { Household } from "@entities/Household";

export default class HouseholdService implements IHouseholdService {

    private householdRepo: Repository<Household>;

    constructor(private connection: DataSource) {
       this.householdRepo = this.connection.getRepository<Household>(Household);
    }

    public async getHousehold(
        householdId: string, 
    ): Promise<Household | null> {
        return await this.householdRepo.findOne({
            where: {id: householdId},
            relations:['members']
        });
    }

}