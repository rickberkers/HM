import { Day } from "../types/Day";
import { Connection } from "typeorm";
import { IDayService } from "./IDayService";
import { addDaysToDate } from "../utils";
import { Between } from "typeorm";
import { Commitment } from "../entities/Commitment";
import { DayInfo } from "../entities/DayInfo";
import { CommitmentMap } from "../types/Commitment";

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
    ): Promise<Day[]> {

        const maxDate = addDaysToDate(new Date(minDate), limit);

        const whereClause = { 
            where: {
                day: Between(minDate, maxDate),
                householdId
            }
        };

        const dayInfosFind = this.dayInfoRepo.find(whereClause);
        const commitmentFind = this.commitmentRepo.find({
            order: { day: 'ASC' }, ...whereClause, 
        });

        const queryResult = await Promise.all([commitmentFind, dayInfosFind]);
        return this.combineCommitmentsAndDayInfos(...queryResult);
    }
    
    /**
     * Combines commitments and dayInfos to an array of Days
     * @param commitments 
     * @param dayInfos 
     */
    private combineCommitmentsAndDayInfos(commitments: Commitment[], dayInfos: DayInfo[]) {
        
        // Group commitments by day for easier access with combining
        const commitmentMap = commitments.reduce((storage: CommitmentMap, item) => {
            const group = item.day;
            storage[group] = storage[group] || [];
            storage[group].push(item);
            return storage;
        }, {});

        // Combine datasources to IDay object
        const days = Object.keys(commitmentMap).reduce((storage: Day[], date) => {
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