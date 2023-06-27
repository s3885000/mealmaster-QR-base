import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @Column()
    number: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    ward: string;

    @OneToOne(() => Restaurant)
    @JoinColumn()
    restaurant: Restaurant;
}