import { Order } from "src/order/entity/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    status: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => Order, order => order.orderStatus)
    order: Order;
}