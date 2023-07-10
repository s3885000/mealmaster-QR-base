import { Tables } from "src/table/entity/table.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QrCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table_id: number;

    @Column('text')
    code_image: string;

    @OneToOne(() => Tables)
    @JoinColumn()
    table: Tables;

}