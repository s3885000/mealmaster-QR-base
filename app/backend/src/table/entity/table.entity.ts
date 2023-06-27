import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "src/order/entity/order.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";

@Entity()
export class Tables {
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

    @OneToMany(() => Order, order => order.table)
    order: Order[];

    @ManyToOne(() => Restaurant, restaurant => restaurant.tables)
    restaurant: Restaurant;
}