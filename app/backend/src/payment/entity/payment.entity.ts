import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { Order } from "src/order/entity/order.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Order, order => order.payment)
    order: Order;

    @ManyToOne(() => User, user => user.payment)
    user: User;

    @Column()
    payment_id: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column()
    payment_method: string;

    @Column()
    payment_status: string;

    @Column()
    payment_amount: number;

}