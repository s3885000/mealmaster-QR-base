import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QrCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table_id: number;

    @Column()
    image: string;
}