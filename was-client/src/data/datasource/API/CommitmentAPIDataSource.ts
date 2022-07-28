import { Axios } from 'axios';
import { formatISODateNoTime } from '../../../core/utils/dateUtils';
import ICommitmentDataSource from '../ICommitmentDataSource';

const generateBaseURL = (date: Date) => `/days/${formatISODateNoTime(date)}/commitments`;

export default class CommitmentAPIDataSource implements ICommitmentDataSource {

    constructor(private axios: Axios) {}
    
    public async addCommitmentGuests(day: Date,  householdId: string, newGuests: string[]): Promise<void> {
        const baseUrl = generateBaseURL(day);
        await this.axios.put<Day>(`${baseUrl}/guests`, {
            guests: newGuests
        }, {params: {householdId}});
        return;
    }
    public async removeCommitmentGuests(day: Date, householdId: string, guests: string[]): Promise<void> {
        const baseUrl = generateBaseURL(day);
        await this.axios.delete<Day>(`${baseUrl}/guests`, {
            params: {householdId},
            data: {guests}
        });
        return;
    }
    public async updateCommitment(day: Date, householdId: string, committed: boolean): Promise<void> {
        const baseUrl = generateBaseURL(day);
        await this.axios.put<Day>(`${baseUrl}`, {
            committed
        }, {params: {householdId}});
        return;
    }
}