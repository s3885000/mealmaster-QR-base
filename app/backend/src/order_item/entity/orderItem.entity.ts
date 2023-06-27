import { Item } from 'src/menu_items/entity/item.entity';
import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    menu_item_id: number;

    @Column()
    quantity: number;

    @Column()
    note: string;

    @Column()
    price: number;

    @ManyToOne(() => Item, menuItem => menuItem.orderItem)
    menuItem: Item;

    @ManyToOne(() => Order, order => order.orderItem)
    order: Order;
}