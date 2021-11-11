import IDay from "../models/IDay";
import { Connection } from "typeorm";
import { IDayService } from "./IDayService";
import { addDayToDate, createDateRange } from "../utils";
import { Between } from "typeorm";
import { Commitment } from "../entities/Commitment";
import { DayInfo } from "../entities/DayInfo";
import { ICommitmentMap } from "../models/ICommitment";

export default class DayService implements IDayService {

    private commitmentRepo;
    private dayInfoRepo;

    constructor(private connection: Connection) {
       this.dayInfoRepo = this.connection.getRepository(DayInfo);
       this.commitmentRepo = this.connection.getRepository(Commitment);
    }

    public async getDaysByDateAndHouseholdId(
        minDate: Date, 
        householdId: string, 
        limit: number = 20, 
        maxDate = addDayToDate(new Date(minDate), limit)
    ): Promise<IDay[]> {

        const whereClause = { 
            where: {
                day: Between(minDate, maxDate),
                householdId
            }
        };

        // Retrieve data from database
        const dayInfos = await this.dayInfoRepo.find(whereClause);
        const commitments = await this.commitmentRepo.find({
            order: { day: 'ASC' }, ...whereClause, 
        });

        // Group commitments by day for easier access with combining
        const commitmentMap = commitments.reduce((storage: ICommitmentMap, item) => {
            const group = item.day;
            storage[group] = storage[group] || [];
            storage[group].push(item);
            return storage;
        }, {});

        // Combine datasources to IDay object
        const days = Object.keys(commitmentMap).reduce((storage: IDay[], date) => {
            storage.push({
                date,
                commitments: commitmentMap[date],
                dayInfo: dayInfos.find(dayInfo => date === dayInfo.day),
            });
            return storage;
        }, []);

        return days;
    }
    
}