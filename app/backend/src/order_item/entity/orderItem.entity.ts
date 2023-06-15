import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    item_id: number;

    @Column()
    quantity: number;

    @Column()
    note: string;
}