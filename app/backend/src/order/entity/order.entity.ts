import { Column, CreateDateColumn, Entity, IntegerType, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm";
import { Payment } from "src/payment/entity/payment.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Tables } from "src/table/entity/table.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { User } from "src/user/entity/user.entity";
import { OrderStatus } from "src/order_status/entity/orderStatus.entity";

export enum PickupType {
    SELF_PICKUP = "SELF_PICKUP",
    SERVE_TO_TABLE = "SERVE_TO_TABLE",
}


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    unique_id: string;

    @ManyToOne(() => User, user => user.order, { cascade: true, onDelete: 'CASCADE' })
    user: User;
    
    @ManyToOne(() => Restaurant, restaurant => restaurant.order, { cascade: true, onDelete: 'CASCADE' })
    restaurant: Restaurant;
    
    @ManyToOne(() => Tables, table => table.order, { cascade: true, onDelete: 'CASCADE' })
    table: Tables;

    @OneToOne(() => Payment, payment => payment.order, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    payment: Payment;    

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];

    @OneToMany(() => OrderStatus, orderStatus => orderStatus.order)
    orderStatus: OrderStatus[];

    @Column()
    total_price: number;

    @Column({ type: 'enum', enum: PickupType, default: PickupType.SELF_PICKUP })
    pickup_type: PickupType;

    
    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

