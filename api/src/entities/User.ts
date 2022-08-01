import { User as UserType} from "@models/User";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from "typeorm";
import { Household } from "./Household";

@Entity()
export class User implements UserType {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    lowerCaseName: string;

    @Column()
    firstName: string;

    @Column({ type: String, nullable: true })
    lastName: string | null;

    // hash should never be selected by default
    @Column({ select: false })
    hash: string;

    // refreshToken should never be selected by default
    @Column({ type: String, select: false, nullable: true })
    refreshToken: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(type => Household, Household => Household.members)
    households: Household[];
};