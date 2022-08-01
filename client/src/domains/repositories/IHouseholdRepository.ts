import { Household } from "../models/Household";

export interface IHouseholdRepository {
    getHousehold(id: string): Promise<Household>;
}