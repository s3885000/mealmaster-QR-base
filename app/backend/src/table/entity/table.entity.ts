import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @Column()
    qr_code_id: number;

    @Column()
    table_no: number;

    @Column()
    description: string;
}