import { Day } from "../../domains/models/Day";

export default interface IDayDataSource {
  getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]>;
  getDay(day: Date): Promise<Day>;
}