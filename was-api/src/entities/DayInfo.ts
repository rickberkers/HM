import { DayInfo as DayInfoType } from "../types/DayInfo";
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Household } from "./Household";

@Entity()
export class DayInfo implements DayInfoType {

    @PrimaryColumn({type: "date"})
    day: string;

    @PrimaryColumn()
    householdId: string;

    @Column({nullable: true})
    note: string

    @ManyToOne(type => Household)
    @JoinColumn({
        name: "householdId",
    })
    household: Household;
}