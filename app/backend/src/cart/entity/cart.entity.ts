import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { CartItem } from "src/cart_item/entity/cartItem.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    status: string;

    @Column()
    pickup_type: number;

    @Column()
    selected_payment_method: string;

    @Column()
    total_price: number;

    @Column()
    total_item: number;

    @Column()
    note: string;

    @ManyToOne(() => User, user => user.cart)
    user: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItem: CartItem[];
}