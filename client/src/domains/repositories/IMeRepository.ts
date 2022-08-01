import { MemberHousehold } from "../models/Household";

export interface IMeRepository {
    getMemberHouseholdsById(memberId: string): Promise<MemberHousehold[]>;
}