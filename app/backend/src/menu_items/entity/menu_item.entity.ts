import { CartItem } from "src/cart_item/entity/cart_item.entity";
import { Category } from "src/catergory/entity/category.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    image: string;

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

}