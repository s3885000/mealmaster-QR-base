import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { QrCode } from "src/qr_code/entity/qrCode.entity";
import { Tables } from "src/table/entity/table.entity";
import { Order } from "src/order/entity/order.entity";
import { Category } from "src/catergory/entity/category.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    user_id: number

    @Column()
    address_id: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    banner: string;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    @OneToMany(() => QrCode, qrCode => qrCode.restaurant)
    qrCode: QrCode[];

    @OneToMany(() => Tables, tables => tables.restaurant)
    tables: Tables[];

    @OneToMany(() => Order, order => order.restaurant)
    order: Order[];

    @OneToMany(() => Category, category => category.restaurant)
    category: Category[];
}