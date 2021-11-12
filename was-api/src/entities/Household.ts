import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import IHousehold from "../interfaces/IHousehold";
import { User } from "./User";

@Entity()
export class Household implements IHousehold {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(type => User, user => user.households)
    @JoinTable()
    members: User[];
};