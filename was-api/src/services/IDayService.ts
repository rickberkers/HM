import IDay from "../interfaces/IDay";

export interface IDayService {
    /**
     * Gets days with corresponding dayInfo's and commitments.
     * @param minDate 
     * @param householdId 
     * @param limit 
     */
    getDaysByDateAndHouseholdId(minDate: Date, householdId: string, limit: number): Promise<IDay[]>;
}