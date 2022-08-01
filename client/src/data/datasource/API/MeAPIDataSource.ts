import { Axios } from 'axios';
import { MemberHousehold } from '../../../domains/models/Household';
import IMeDataSource from '../IMeDataSource';

const BASE_URL = `/me`;

export default class MeAPIDataSource implements IMeDataSource {

    constructor(private axios: Axios) {}

    async getMemberHouseholdsById(): Promise<MemberHousehold[]> {
        const response = await this.axios.get<MemberHousehold[]>(`${BASE_URL}/${'households'}`);
        return response.data;
    }
}