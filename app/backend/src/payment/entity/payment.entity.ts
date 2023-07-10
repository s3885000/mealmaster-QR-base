import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    user_id: number;

    @Column()
    payment_ref_is: number;

    @CreateDateColumn()
    payment_date: Date;

    @Column()
    payment_method: string;

    @Column()
    payment_status: string;

    @Column()
    payment_amount: number;

    @ManyToOne(() => User, user => user.payment)
    user: User;
}