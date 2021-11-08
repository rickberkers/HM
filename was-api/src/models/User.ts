import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import IUser from "./IUser";

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

};