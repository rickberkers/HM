import IDay from "../models/IDay";

export interface IDayService {
    getDaysByDateAndHouseholdId(minDate: Date, householdId: string, limit: number): Promise<IDay[]>;
}