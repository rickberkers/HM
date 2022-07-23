import { MemberHousehold } from "../../domains/models/Household";
import { IMeRepository } from "../../domains/repositories/IMeRepository";
import IMeDataSource from "../datasource/IMeDataSource";

export default class MeRepository implements IMeRepository {

    constructor(
        private dataSource: IMeDataSource
    ) {}

    async getMemberHouseholdsById(memberId: string): Promise<MemberHousehold[]> {
        return this.dataSource.getMemberHouseholdsById(memberId);
    }
}
