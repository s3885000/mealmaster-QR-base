import { Order } from "src/order/entity/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum Status {
    ORDER_PENDING_ACCEPTANCE = "ORDER_PENDING_ACCEPTANCE",
    ORDER_REJECTED = "ORDER_REJECTED",
    ORDER_CONFIRMED = "ORDER_CONFIRMED",
    ORDER_IN_PROGRESS = "ORDER_IN_PROGRESS",
    ORDER_READY = "ORDER_READY",
    ORDER_COMPLETED = "ORDER_COMPLETED",
    ORDER_CANCELLED = "ORDER_CANCELLED",
}

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: Status })
    status: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => Order, order => order.orderStatus, { onDelete: 'CASCADE' })
    order: Order;
}