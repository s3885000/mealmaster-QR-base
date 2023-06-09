import { CartItem } from "src/cart_item/entity/cartItem.entity";
import { Category } from "src/catergory/entity/category.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Item {
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
    is_best_seller: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column()
    status: string;

    @ManyToOne(() => Category, category => category.item)
    category: Category;

    @OneToMany(() => OrderItem, orderItem => orderItem.menuItem)
    orderItem: OrderItem[];

    @OneToMany(() => CartItem, cartItem => cartItem.menuItem)
    cartItem: CartItem[];

}