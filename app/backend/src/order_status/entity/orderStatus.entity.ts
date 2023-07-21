import { Order } from "src/order/entity/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum Status {
    ORDER_CONFIRMED = "ORDER_CONFIRMED",
    ORDER_IN_PROGRESS = "ORDER_IN_PROGRESS",
    ORDER_READY = "ORDER_READY",
}

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column({ type: 'enum', enum: Status })
    status: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => Order, order => order.orderStatus)
    order: Order;
}