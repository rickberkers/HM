import { Household } from "@models/Household";

export interface IHouseholdService {
    getHousehold(id: string): Promise<Household | undefined>;
}