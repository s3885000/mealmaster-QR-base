import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    user_id: number;

    @Column()
    payment_date: Date;

    @Column()
    payment_method: string;

    @Column()
    payment_status: string;

    @Column()
    payment_amount: number;
}