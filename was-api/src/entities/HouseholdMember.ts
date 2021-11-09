import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import IHouseHoldMember from "src/models/IHouseholdMember";
import { Household } from "./Household";
import { User } from "./User";

@Entity()
export class HouseholdMember implements IHouseHoldMember{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Household)
    @JoinColumn({
        name: "householdId",
    })
    household: Household;
    householdId: string;

    @ManyToOne(type => User)
    @JoinColumn({
        name: "userId",
    })
    user: User;
    userId: string;
}