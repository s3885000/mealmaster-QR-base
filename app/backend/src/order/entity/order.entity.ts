import { Column, Entity, IntegerType, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Table } from "typeorm";
import { Payment } from "src/payment/entity/payment.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Tables } from "src/table/entity/table.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { User } from "src/user/entity/user.entity";
import { OrderStatus } from "src/order_status/entity/orderStatus.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @Column()
    table_id: number;

    @Column()
    payment_id: number;

    @Column()
    user_id: number;

    @Column()
    current_status: string;

    @Column()
    total_price: number;

    @Column()
    pickup_type: number;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    @Column()
    note: string;

    @OneToOne(() => Payment) 
    @JoinColumn()
    payment: Payment;

    @ManyToOne(() => Tables, table => table.order)
    table: Table;

    @ManyToOne(() => Restaurant, restaurant => restaurant.order)
    restaurant: Restaurant;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItem: OrderItem[];

    @ManyToOne(() => User, user => user.order)
    user: User;

    @OneToMany(() => OrderStatus, orderStatus => orderStatus.order)
    orderStatus: OrderStatus[];

}