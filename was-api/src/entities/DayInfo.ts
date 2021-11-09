import IDayInfo from "src/models/IDayInfo";
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, Column } from "typeorm";
import { Commitment } from "./Commitment";
import { Household } from "./Household";
import { HouseholdMember } from "./HouseholdMember";

@Entity()
export class DayInfo implements IDayInfo {

    @PrimaryColumn({type: "date"})
    day: Date;

    @PrimaryColumn()
    householdId: string;

    @PrimaryColumn()
    householdMemberId: string;

    @Column({nullable: true})
    note: string

    @ManyToOne(type => Household)
    @JoinColumn({
        name: "householdId",
    })
    household: Household;

    @ManyToOne(type => HouseholdMember)
    @JoinColumn({
        name: "householdMemberId",
    })
    householdMember: HouseholdMember;

    @OneToMany(type => Commitment, committment => committment.dayInfo)
    commitments: Commitment[];
}