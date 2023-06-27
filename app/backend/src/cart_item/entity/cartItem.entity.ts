import { Cart } from "src/cart/entity/cart.entity";
import { Item } from "src/items/entity/item.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cart_id: number;

    @Column()
    menu_item_id: number;

    @Column()
    quantity: number;

    @Column()
    note: string;

    @Column()
    price: number;

    @ManyToOne(() => Item, menuItem => menuItem.cartItem)
    menuItem: Item;

    @ManyToOne(() => Cart, cart => cart.cartItem)
    cart: Cart;
}