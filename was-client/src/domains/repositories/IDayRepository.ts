import { Day } from "../models/Day";

export interface IDayRepository {
    getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]>;
    getDay(date: Date): Promise<Day>;
}