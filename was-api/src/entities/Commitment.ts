import ICommitment from "src/models/ICommitment";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Household } from "./Household";
import { DayInfo } from "./DayInfo";
import { HouseholdMember } from "./HouseholdMember";

@Entity()
export class Commitment implements ICommitment{

    @PrimaryColumn({type: "date"})
    day: Date;

    @ManyToOne(type => Household, {primary: true})
    @JoinColumn({
        name: "householdId",
    })
    household: Household;
    householdId: string;

    @ManyToOne(type => HouseholdMember, {primary: true})
    @JoinColumn({
        name: "householdMemberId",
    })
    householdMember: HouseholdMember;
    householdMemberId: string;

    @ManyToOne(type => DayInfo, dayInfo => dayInfo.commitments, {
        createForeignKeyConstraints: false
    })
    @JoinColumn([
        { name: "day", referencedColumnName:"day" },
        { name: "householdId", referencedColumnName: "householdId" },
        { name: "householdMemberId", referencedColumnName: "householdMemberId" },
    ])
    dayInfo: DayInfo;

    @Column("text", { array: true })
    guests: string[];

    @Column()
    committed: boolean;
}