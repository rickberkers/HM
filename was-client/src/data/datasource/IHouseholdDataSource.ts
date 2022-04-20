import { Household } from "../../domains/models/Household";

export default interface IHouseholdDataSource {
  getHousehold(id: string): Promise<Household>;
}