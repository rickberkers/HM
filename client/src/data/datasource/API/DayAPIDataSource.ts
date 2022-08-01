import { Axios } from 'axios';
import IDayDataSource from "../IDayDataSource";
import { Day } from "../../../domains/models/Day";
import { parseISODateNoTime, formatISODateNoTime } from '../../../core/utils/dateUtils';

const BASE_URL = `/days`;

export default class DayAPIDataSource implements IDayDataSource {

    constructor(private axios: Axios) {}

    async getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]> {
        const response = await this.axios.get<Day[]>(BASE_URL, {
            params: {
                householdId,
                startDate: formatISODateNoTime(startDate),
                limit
            },
            transformResponse: (data: any) => {
                data = JSON.parse(data);
                return data.map((day: any) => {
                    day.date = parseISODateNoTime(day.date);
                    day.commitments.map(this.transformCommitment);
                    return day;
                });
            },
        });
        return response.data;
    }

    async getDay(day: Date, householdId: string): Promise<Day> {

        const ISODayDate = formatISODateNoTime(day);
        const response = await this.axios.get<Day>(`${BASE_URL}/${ISODayDate}`, {
            params: {
              householdId  
            },
            transformResponse: (data: any) => {
                let day = JSON.parse(data);
                day.date = parseISODateNoTime(day.date);
                day.commitments.map(this.transformCommitment);
                return day;
            },
        });
        return response.data;
    }

    private transformCommitment(commitment: any) {
        commitment.day = parseISODateNoTime(commitment.day);
        return commitment;
    }
}