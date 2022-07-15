import { Connection, Repository } from "typeorm";
import { IHouseholdService } from "./IHouseholdService";
import { Household } from "@entities/Household";

export default class HouseholdService implements IHouseholdService {

    private householdRepo: Repository<Household>;

    constructor(private connection: Connection) {
       this.householdRepo = this.connection.getRepository<Household>(Household);
    }

    public async getHousehold(
        householdId: string, 
    ): Promise<Household | undefined> {
        return await this.householdRepo.findOne(householdId, {relations:['members']});
    }

}