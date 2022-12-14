import { Commitment as CommitmentType } from "@models/Commitment";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Household } from "./Household";
import { User } from "./User";

@Entity()
export class Commitment implements CommitmentType {

    @PrimaryColumn({type: "date"})
    day: string;

    @PrimaryColumn()
    householdId: string;

    @PrimaryColumn()
    userId: string;

    @ManyToOne(type => Household)
    @JoinColumn({name: "householdId"})
    household: Household;

    @ManyToOne(type => User)
    @JoinColumn({name: "userId"})
    user: User;

    @Column("text", { array: true, default: '{}' })
    guests: string[];

    @Column()
    committed: boolean;
}