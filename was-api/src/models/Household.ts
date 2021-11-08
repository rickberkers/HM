import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IHousehold from "./IHousehold";

@Entity()
export class Household implements IHousehold {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

};