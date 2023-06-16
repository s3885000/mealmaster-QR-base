import { Column, Entity, IntegerType, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { type } from "os";
import { User } from "src/user/entity/user.entity";
import { Item } from "src/items/entity/item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @Column()
    table_id: number;

    @Column()
    user_id: number;

    @Column()
    order_date: Date;

    @Column()
    current_status: string;

    @Column()
    total_amount: number;

    // @ManyToOne(type => Restaurant) @JoinColumn()
    // restaurant: Restaurant;

    // @ManyToOne(type => Table) @JoinColumn()
    // table: Table;

    // @ManyToOne(type => User) @JoinColumn()
    // user: User;

    // @OneToMany(type => Item) @JoinColumn()
    // items: Item;

}