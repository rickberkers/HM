import ICommitment from "src/models/ICommitment";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Household } from "./Household";
import { DayInfo } from "./DayInfo";

@Entity()
export class Commitment implements ICommitment{

    @Column()
    committed: boolean;

    @PrimaryColumn({type: "date"})
    day: Date;

    @ManyToOne(type => Household, {primary: true})
    @JoinColumn({
        name: "householdId",
    })
    household: Household;

    @ManyToOne(type => DayInfo, dayInfo => dayInfo.commitments)
    @JoinColumn([
        { name: "day", referencedColumnName:"day" },
        { name: "householdId", referencedColumnName: "householdId" },
    ])
    dayInfo: DayInfo;

    @Column("text", { array: true })
    guests: string[];

}