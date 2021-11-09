import IDayInfo from "src/models/IDayInfo";
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, Column } from "typeorm";
import { Commitment } from "./Commitment";
import { Household } from "./Household";

@Entity()
export class DayInfo implements IDayInfo {

    @PrimaryColumn({type: "date"})
    day: Date;

    @PrimaryColumn()
    householdId: string;

    @Column({nullable: true})
    note: string

    @ManyToOne(type => Household)
    @JoinColumn({
        name: "householdId",
    })
    household: Household;

    @OneToMany(type => Commitment, committment => committment.dayInfo)
    commitments: Commitment[];
}