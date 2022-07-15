import { Day } from "../../domains/models/Day";
import { IDayRepository } from "../../domains/repositories/IDayRepository";
import DayAPIDataSource from "../datasource/API/DayAPIDataSource";

export default class DayRepository implements IDayRepository {

    constructor(
        private dataSource: DayAPIDataSource
    ) {}

    async getDay(date: Date, householdId: string): Promise<Day> {
        return this.dataSource.getDay(date, householdId);
    }

    async getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]> {
        return this.dataSource.getDays(householdId, startDate, limit);
    }

}
