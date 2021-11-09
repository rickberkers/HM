import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import IHousehold from "../models/IHousehold";

@Entity()
export class Household implements IHousehold {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

};