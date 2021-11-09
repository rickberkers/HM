import ICommitment from "src/models/ICommitment";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Household } from "./Household";
import { DayInfo } from "./DayInfo";
import { User } from "./User";

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

    @ManyToOne(type => User, {primary: true})
    @JoinColumn({
        name: "userId",
    })
    user: User;
    userId: string;

    @ManyToOne(type => DayInfo, dayInfo => dayInfo.commitments, {
        createForeignKeyConstraints: false
    })
    @JoinColumn([
        { name: "day", referencedColumnName:"day" },
        { name: "householdId", referencedColumnName: "householdId" }
    ])
    dayInfo: DayInfo;

    @Column("text", { array: true, nullable: true })
    guests: string[];

    @Column()
    committed: boolean;
}