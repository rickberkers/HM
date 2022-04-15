import { Day } from "../../models/Day";
import { IDayRepository } from "../../repositories/IDayRepository";

export default class GetDaysUseCase {
    constructor(
        private dayRepository: IDayRepository
    ) {}

    async invoke(householdId: string, startDate: Date, limit: number): Promise<Day[]> {
        return await this.dayRepository.getDays(householdId, startDate, limit);
    }
}