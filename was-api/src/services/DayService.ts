import { Day } from "@models/Day";
import { IDayService } from "./IDayService";
import { Between, Connection, Repository } from "typeorm";
import { Commitment } from "@entities/Commitment";
import { DayInfo } from "@entities/DayInfo";
import { CommitmentMap } from "@models/Commitment";
import { formatISO } from "date-fns";
import { addDaysToDate, createDateRangeArray } from "@utils/date";

export default class DayService implements IDayService {

    private commitmentRepo: Repository<Commitment>;
    private dayInfoRepo: Repository<DayInfo>;

    constructor(private connection: Connection) {
       this.dayInfoRepo = this.connection.getRepository<DayInfo>(DayInfo);
       this.commitmentRepo = this.connection.getRepository<Commitment>(Commitment);
    }

    public async getDayByDateAndHouseholdId(date: Date, householdId: string): Promise<Day> {

        const [commitments, dayInfo] = await this.queryDayData(date, householdId);

        return {
            commitments,
            dayInfo,
            date: formatISO(date)
        }
    }

    public async getDaysByDateAndHouseholdId(
        minDate: Date, 
        householdId: string, 
        limit: number = 20, 
    ): Promise<Day[]> {

        // Max date based on limit and minDate
        const maxDate = addDaysToDate(new Date(minDate), limit);

        // Collect data
        const [commitments, dayInfos] = await this.queryDaysData(maxDate, minDate, householdId);

        // Group commitments by date
        const groupedCommitments = this.groupCommitmentsByDay(commitments);

        // Sets commitments and dayInfos at right date in range
        const daysMap = this.combineCommitmentsAndDayInfos(groupedCommitments, dayInfos, createDateRangeArray(minDate, maxDate));

        return Array.from(daysMap.values());
    }

    public async queryDayData(date: Date, householdId: string): Promise<[Commitment[], DayInfo?]> {

        const sharedWhereClause = { 
            where: {
                day: date,
                householdId
            }
        };

        const dayInfoQuery = this.dayInfoRepo.findOne(sharedWhereClause);
        const commitmentsQuery = this.commitmentRepo.find({
            order: { day: 'ASC' }, ...sharedWhereClause, 
        });

        return Promise.all([commitmentsQuery, dayInfoQuery]);
    }


    private async queryDaysData(maxDate: Date, minDate: Date, householdId: string): Promise<[Commitment[], DayInfo[]]> {

        const sharedWhereClause = { 
            where: {
                day: Between(minDate, maxDate),
                householdId
            }
        };

        const dayInfosQuery = this.dayInfoRepo.find(sharedWhereClause);
        const commitmentsQuery = this.commitmentRepo.find({
            order: { day: 'ASC' }, ...sharedWhereClause, 
        });

        return Promise.all([commitmentsQuery, dayInfosQuery]);
    }

    private combineCommitmentsAndDayInfos(groupedCommitments: CommitmentMap, dayInfos: DayInfo[], dateRange: Date[]) {
        
        let resultMap = new Map<string, Day>();

        dateRange.forEach((date) => {
            // String to ISO date
            const dateString = formatISO(date, { representation: 'date' });
            resultMap.set(dateString, {
                commitments: groupedCommitments[dateString] ?? [],
                date: dateString,
            })
        });

        // Add dayInfos
        dayInfos.forEach((dayInfo) => {
            let day = resultMap.get(dayInfo.day);
            if (day) {
                day.dayInfo = dayInfo;
            }
        })

        return resultMap;
    }

    private groupCommitmentsByDay(commitments: Commitment[]): CommitmentMap {
        return commitments.reduce((storage: CommitmentMap, item) => {
            const group = item.day;
            storage[group] = storage[group] || [];
            storage[group].push(item);
            return storage;
        }, {});
    }
}