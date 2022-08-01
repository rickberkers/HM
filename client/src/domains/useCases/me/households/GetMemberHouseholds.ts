import { MemberHousehold } from "../../../models/Household";
import { IMeRepository } from "../../../repositories/IMeRepository";

export default class GetMemberHouseholdsByIdUseCase {
    constructor(
        private meRepository: IMeRepository
    ) {}

    async invoke(memberId: string): Promise<MemberHousehold[]> {
        return await this.meRepository.getMemberHouseholdsById(memberId);
    }
}