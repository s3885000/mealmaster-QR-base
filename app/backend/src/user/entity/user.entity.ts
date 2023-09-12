import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserProfileResponseDto } from "../dto/response/userProfileResponse.dto";
import { Order } from "src/order/entity/order.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Cart } from "src/cart/entity/cart.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";

export enum UserRole {
    CUSTOMER = 'customer',
    RESTAURANT_OWNER = 'restaurant-owner',
    GUEST = 'guest',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable: true })
    guest_id: string;

    @Column({ unique: true, nullable: true, default: null })
    phone_number: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    stripeCustomerId: string;

    @Column({ nullable: true })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER})
    role: UserRole;

    @Column({ default: false})
    is_guest: boolean;

    @Column({ nullable: true })
    refresh_token: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    profile_picture: string;

    @Column({ nullable: true })
    defaultCardId: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    toResponseObject(): UserProfileResponseDto {
        const { id, first_name, last_name, profile_picture, phone_number, email, role } = this;
        return { id, first_name, last_name, profile_picture, phone_number, email, role };
    }

    @OneToMany(() => Order, order => order.user)
    order: Order[];

    @OneToMany(() => Payment, payment => payment.user)
    payment: Payment[];

    @OneToMany(() => Cart, cart => cart.user)
    cart: Cart[];

    @OneToOne(() => Restaurant, restaurant => restaurant.owner)
    restaurant: Restaurant;

}
