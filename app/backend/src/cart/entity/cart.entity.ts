import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { CartItem } from "src/cart_item/entity/cart_item.entity";

export enum PickupType {
    SELF_PICKUP = "SELF_PICKUP",
    SERVE_TO_TABLE = "SERVE_TO_TABLE",
}

export enum CartStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    ABANDONED = "ABANDONED",
}

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: CartStatus,
        default: CartStatus.ACTIVE,
     })
    status: CartStatus;

    @Column({
        type: "enum",
        enum: PickupType,
        default: PickupType.SELF_PICKUP,
    })
    pickup_type: PickupType;

    @Column({ default: 0 })
    total_price: number;

    @Column({ default: 0})
    total_item: number;

    @ManyToOne(() => User, user => user.cart)
    user: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItem: CartItem[];
}