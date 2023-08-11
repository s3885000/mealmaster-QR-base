import { MenuItem } from "src/menu_items/entity/menu_item.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { categoryIdentifier } from "./categoryIdentifier";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restaurant, restaurant => restaurant.category, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;

    @Column({
        type: 'enum',
        enum: categoryIdentifier,
    })
    identifier: categoryIdentifier;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => MenuItem, item => item.category)
    items: MenuItem[];
}
