import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Tables } from "src/table/entity/table.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity()
export class QrCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @Column()
    table_id: number;

    @Column()
    code_image: string;

    @OneToOne(() => Tables)
    @JoinColumn()
    table: Tables;

    @ManyToOne(() => Restaurant, restaurant => restaurant.qrCode)
    restaurant: Restaurant;
}