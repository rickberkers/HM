import { Day } from "../../domains/models/Day";

export default interface IDateDataSource {
  getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]>;
}