import IUser from "../interfaces/IUser";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from "typeorm";
import { Household } from "./Household";

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(type => Household, Household => Household.members)
    households: Household[];
};