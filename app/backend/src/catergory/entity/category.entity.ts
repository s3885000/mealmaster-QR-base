import { MenuItem } from "src/menu_items/entity/menu_item.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restaurant, restaurant => restaurant.category, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => MenuItem, item => item.category)
    items: MenuItem[];
}
