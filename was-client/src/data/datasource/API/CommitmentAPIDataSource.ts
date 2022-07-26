import { Axios } from 'axios';
import { formatISODateNoTime } from '../../../core/utils/dateUtils';
import ICommitmentDataSource from '../ICommitmentDataSource';

const generateBaseURL = (date: Date) => `/days/${formatISODateNoTime(date)}/commitments`;

export default class CommitmentAPIDataSource implements ICommitmentDataSource {

    constructor(private axios: Axios) {}
    
    addCommitmentGuests(day: Date, newGuests: string[]): Promise<void> {

        const url = generateBaseURL(day);

        // const response = await this.axios.get<Day>(`${BASE_URL}/${ISODayDate}`, {
        //     params: {
        //       householdId  
        //     },
        //     transformResponse: (data: any) => {
        //         let day = JSON.parse(data);
        //         day.date = parseISODateNoTime(day.date);
        //         day.commitments.map(this.transformCommitment);
        //         return day;
        //     },
        // });
        // return response.data;
        return Promise.resolve();
    }
    removeCommitmentGuests(day: Date, guests: string[]): Promise<void> {
        return Promise.resolve();
    }
    updateCommitment(day: Date, committed: boolean): Promise<void> {
        return Promise.resolve();
    }
}