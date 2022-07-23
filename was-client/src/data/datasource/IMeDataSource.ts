import { MemberHousehold } from "../../domains/models/Household";

export default interface IMeDataSource {
  getMemberHouseholdsById(memberId: string): Promise<MemberHousehold[]>;
}