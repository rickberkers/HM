import { Axios } from 'axios';
import IDayDataSource from "../IDayDataSource";
import { Day } from "../../../domains/models/Day";
import { format, parseISO } from 'date-fns';

const BASE_URL = `/days`;

export default class DayAPIDataSource implements IDayDataSource {

    constructor(private axios: Axios) {}

    async getDays(householdId: string, startDate: Date, limit: number): Promise<Day[]> {
        const response = await this.axios.get<Day[]>(BASE_URL, {
            params: {
                householdId,
                startDate: format(startDate, 'yyyy-MM-dd'),
                limit
            },
            transformResponse: (data: any) => {
                data = JSON.parse(data);
                return data.map((day: any) => {
                    day.date = parseISO(day.date);
                    day.commitments.map((commitment: any) => {
                        commitment.day = parseISO(commitment.day);
                        return commitment;
                    });
                    return day;
                });
            },
        });
        return response.data;
    }

    async getDay(day: Date, householdId: string): Promise<Day> {

        const ISODayDate = format(day, 'yyyy-MM-dd');
        const response = await this.axios.get<Day>(`${BASE_URL}/${ISODayDate}`, {
            params: {
              householdId  
            },
            transformResponse: (data: any) => {
                let day = JSON.parse(data);
                day.date = parseISO(day.date);
                day.commitments.map((commitment: any) => {
                    commitment.day = parseISO(commitment.day);
                    return commitment;
                });
                return day;
            },
        });
        return response.data;
    }
}