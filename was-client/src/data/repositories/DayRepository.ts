import { Day } from "../../domains/models/Day";
import { IDayRepository } from "../../domains/repositories/IDayRepository";
import IDayDataSource from "../datasource/IDayDataSource";

export default class DayRepository implements IDayRepository {

    constructor(
        private dataSource: IDayDataSource
    ) {}

    async getDay(date: Date, householdId: string): Promise<Day> {
        return this.dataSource.getDay(date, householdId);
    }

    async getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]> {
        return this.dataSource.getDays(householdId, startDate, limit);
    }

}
