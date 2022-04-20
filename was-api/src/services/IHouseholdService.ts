import { Household } from "../types/Household";

export interface IHouseholdService {
    getHousehold(id: string): Promise<Household | undefined>;
}