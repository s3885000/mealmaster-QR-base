import { Column, CreateDateColumn, Entity, IntegerType, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm";
import { Payment } from "src/payment/entity/payment.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Tables } from "src/table/entity/table.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { User } from "src/user/entity/user.entity";
import { OrderStatus } from "src/order_status/entity/orderStatus.entity";
import { nanoid } from "nanoid";

export enum PickupType {
    PICKUP_AT_COUNTER = "PICKUP_AT_COUNTER",
    SERVE_TO_TABLE = "SERVE_TO_TABLE",
}

const SERVICE_FEE = 5000; // Service fee

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = nanoid();


    @Column()
    current_status: string;

    @Column()
    total_price: number;

    @Column({ type: 'enum', enum: PickupType, default: PickupType.PICKUP_AT_COUNTER })
    pickup_type: PickupType;

    set totalPrice(value: number) {
        if (this.pickup_type === PickupType.SERVE_TO_TABLE) {
            this.totalPrice = value + SERVICE_FEE;
        } else {
            this.total_price = value;
        }
    }

    @CreateDateColumn({ type: 'timestamp' })
    create_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date;

    @Column({ type: "text", nullable: true })
    note: string;

    @OneToOne(() => Payment) 
    @JoinColumn()
    payment: Payment;

    @ManyToOne(() => Tables, table => table.order)
    table: Tables;

    @ManyToOne(() => Restaurant, restaurant => restaurant.order)
    restaurant: Restaurant;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @ManyToOne(() => User, user => user.order)
    user: User;

    @OneToMany(() => OrderStatus, orderStatus => orderStatus.order)
    orderStatus: OrderStatus[];

}