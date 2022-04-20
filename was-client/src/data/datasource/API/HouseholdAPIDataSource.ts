import { Axios } from 'axios';
import { Household } from '../../../domains/models/Household';
import IHouseholdDataSource from '../IHouseholdDataSource';

const BASE_URL = `/households`;

export default class HouseholdAPIDataSource implements IHouseholdDataSource {

    constructor(private axios: Axios) {}

    async getHousehold(id: string): Promise<Household> {
        const response = await this.axios.get<Household>(`${BASE_URL}/${id}`);
        return response.data;
    }
}