import IDay from "../models/IDay";
import { Connection } from "typeorm";
import { IDayService } from "./IDayService";
import { addDayToDate } from "../utils";
import { Between } from "typeorm";
import { Commitment } from "../entities/Commitment";
import { DayInfo } from "../entities/DayInfo";

export default class DayService implements IDayService {

    constructor(private connection: Connection) {}

    public async getDaysByDateAndHouseholdId(minDate: Date, householdId: string, limit: number = 20): Promise<IDay[]> {

        const commitmentRepo = this.connection.getRepository(Commitment);
        const dayInfoRepo = this.connection.getRepository(DayInfo);
    
        const maxDate = addDayToDate(new Date(minDate), limit)
        //const dates = dateRange(input.minDate, maxDate);
    
        let commitments = await commitmentRepo.find({
          where: {
            day: Between(minDate, maxDate),
            householdId
          }
        });
    
        return commitments;
    }
}