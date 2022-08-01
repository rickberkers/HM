import { DataSource, Repository } from "typeorm";
import { IHouseholdService } from "./IHouseholdService";
import { Household as HouseholdEntity } from "@entities/Household";
import { Household } from "@models/Household";
import { User as UserEntity } from "@entities/User";

export default class HouseholdService implements IHouseholdService {

    private householdRepo: Repository<HouseholdEntity>;

    constructor(private connection: DataSource) {
       this.householdRepo = this.connection.getRepository<HouseholdEntity>(HouseholdEntity);
    }

    public async householdMemberRelationExists(id: string, memberId: string): Promise<boolean> {
        const household = await this.householdRepo
            .createQueryBuilder('household')
            .leftJoin('household.members', 'user')
            .where('user.id = :memberId', {memberId})
            .andWhere('household.id = :id', {id})
            .getOne();
        return household != undefined;
    }
    
    public async getHouseholdsByMemberId(memberId: string): Promise<Household[]> {
        return await this.connection.createQueryBuilder().relation(UserEntity, 'households').of(memberId).loadMany<Household>();
    }

    public async getHousehold(
        householdId: string, 
    ): Promise<Household | null> {
        return await this.householdRepo.findOne({
            where: {id: householdId},
            relations:['members']
        });
    }

}