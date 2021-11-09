import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from "typeorm";
import IHousehold from "../models/IHousehold";
import { HouseholdMember } from "./HouseholdMember";

@Entity()
export class Household implements IHousehold {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => HouseholdMember, HouseholdMember => HouseholdMember.household)
    houseHoldMembers: HouseholdMember[];
};