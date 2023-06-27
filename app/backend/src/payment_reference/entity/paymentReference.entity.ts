import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entity/user.entity";
import { Payment } from "src/payment/entity/payment.entity";

@Entity()
export class PaymentReference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cart_id: number;

    @Column()
    user_id: number;

    @Column()
    payment_ref: string;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.paymentRef)
    user: User;

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment;
}