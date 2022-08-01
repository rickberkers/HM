import { Day } from "@models/Day";

export interface IDayService {
    /**
     * Gets days with corresponding dayInfo's and commitments.
     * @param minDate 
     * @param householdId 
     * @param limit
     */
    getDaysByDateAndHouseholdId(minDate: Date, householdId: string, limit?: number): Promise<Day[]>;
    /**
     * Gets day with corresponding dayInfo and commitments
     * @param date
     */
    getDayByDateAndHouseholdId(date: Date, householdId: string): Promise<Day>;
}