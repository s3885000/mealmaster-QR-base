import { Item } from "src/menu_items/entity/item.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Restaurant, restaurant => restaurant.category)
    restaurant: Restaurant;

    @OneToMany(() => Item, item => item.category)
    item: Item[];

}