import { Household } from "../../models/Household";
import { IHouseholdRepository } from "../../repositories/IHouseholdRepository";

export default class GetHouseholdUseCase {
    constructor(
        private householdRepository: IHouseholdRepository
    ) {}

    async invoke(householdId: string): Promise<Household> {
        return await this.householdRepository.getHousehold(householdId);
    }
}