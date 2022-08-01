import { Household } from "@models/Household";

export interface IHouseholdService {
    getHousehold(id: string): Promise<Household | null>;
    getHouseholdsByMemberId(memberId: string): Promise<Household[]>;
    householdMemberRelationExists(id: string, memberId: string): Promise<boolean>;
}