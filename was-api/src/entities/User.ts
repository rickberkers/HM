import { User as UserType} from "../types/User";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from "typeorm";
import { Household } from "./Household";

@Entity()
export class User implements UserType {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    // hash should never be selected by default
    @Column({ select: false })
    hash: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(type => Household, Household => Household.members)
    households: Household[];
};