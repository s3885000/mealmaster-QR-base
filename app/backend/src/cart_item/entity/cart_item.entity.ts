import { Cart } from "src/cart/entity/cart.entity";
import { MenuItem } from "src/menu_items/entity/menu_item.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    note: string;

    @Column()
    price: number;

    @ManyToOne(() => MenuItem, menuItem => menuItem.cartItem)
    menuItem: MenuItem;

    @ManyToOne(() => Cart, cart => cart.cartItem)
    cart: Cart;
}