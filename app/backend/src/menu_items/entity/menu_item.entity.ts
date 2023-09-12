import { CartItem } from "src/cart_item/entity/cart_item.entity";
import { Category } from "src/catergory/entity/category.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'varchar', length: 1000 })
    description: string;

    @Column()
    price: number;

    @Column()
    is_best_seller: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => Category, category => category.items)
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.menuItem)
    orderItem: OrderItem[];

    @OneToMany(() => CartItem, cartItem => cartItem.menuItem)
    cartItem: CartItem[];

    @OneToMany(() => Image, image => image.menuItem, { eager: true })
    images: Image[];

}