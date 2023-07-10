import { Collection, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
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

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.paymentRef)
    user: User;

    @OneToOne(() => Payment)
    @JoinColumn()
    payment: Payment;
}