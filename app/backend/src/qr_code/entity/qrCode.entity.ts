import { Tables } from "src/table/entity/table.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class QrCode {
    @PrimaryGeneratedColumn()
    id: number;


    @Column('text')
    code_image: string;

    @OneToOne(() => Tables, table => table.qr_code, { eager: true })
    @JoinColumn()
    table: Tables;

}