import { Household } from "../../domains/models/Household";
import { IHouseholdRepository } from "../../domains/repositories/IHouseholdRepository";
import IHouseholdDataSource from "../datasource/IHouseholdDataSource";

export default class HouseholdRepository implements IHouseholdRepository {

    constructor(
        private dataSource: IHouseholdDataSource
    ) {}

    async getHousehold(id: string): Promise<Household> {
        return this.dataSource.getHousehold(id);
    }

}
