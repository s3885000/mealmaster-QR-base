import { Collection, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Cart } from "src/cart/entity/cart.entity";

@Entity()
export class PaymentReference {
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToOne(() => Cart, cart => cart.paymentReference)
    @JoinColumn()
    cart: Cart;
}