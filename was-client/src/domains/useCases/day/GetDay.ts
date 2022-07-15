import { Day } from "../../models/Day";
import { IDayRepository } from "../../repositories/IDayRepository";

export default class GetDayUseCase {
    constructor(
        private dayRepository: IDayRepository
    ) {}

    async invoke(date: Date, householdId: string): Promise<Day> {
        return await this.dayRepository.getDay(date, householdId);
    }
}