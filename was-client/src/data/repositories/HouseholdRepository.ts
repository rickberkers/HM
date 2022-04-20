import { Household } from "../../domains/models/Household";
import { IHouseholdRepository } from "../../domains/repositories/IHouseholdRepository";
import HouseholdAPIDataSource from "../datasource/API/HouseholdAPIDataSource";

export default class HouseholdRepository implements IHouseholdRepository {

    constructor(
        private dataSource: HouseholdAPIDataSource
    ) {}

    async getHousehold(id: string): Promise<Household> {
        return this.dataSource.getHousehold(id);
    }

}
