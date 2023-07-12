import { Order } from "src/order/entity/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    status: string;

    @CreateDateColumn()
    timestamp: Date;

    @ManyToOne(() => Order, order => order.orderStatus)
    order: Order;
}