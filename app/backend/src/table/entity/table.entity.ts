import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "src/order/entity/order.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { QrCode } from "src/qr_code/entity/qrCode.entity";

@Entity()
export class Tables {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    restaurant_id: number;

    @OneToOne(() => QrCode, qrCode => qrCode.table)
    @JoinColumn()
    qr_code: QrCode;

    @Column()
    table_no: number;

    @Column()
    description: string;

    @OneToMany(() => Order, order => order.table)
    order: Order[];

    @ManyToOne(() => Restaurant, restaurant => restaurant.tables)
    restaurant: Restaurant;
}