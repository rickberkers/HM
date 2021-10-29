import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal", { precision: 12, scale: 2 })
    price: number;
}