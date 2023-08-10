import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tables } from "src/table/entity/table.entity";
import { Order } from "src/order/entity/order.entity";
import { Category } from "src/catergory/entity/category.entity";
import { ResAddress } from "src/res_address/entity/resAddress.entity";
import { User } from "src/user/entity/user.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    banner: string;

    @CreateDateColumn()
    create_at: Date;

    @CreateDateColumn()
    update_at: Date;

    @OneToMany(() => Tables, tables => tables.restaurant)
    tables: Tables[];

    @OneToMany(() => Order, order => order.restaurant)
    order: Order[];

    @OneToMany(() => Category, category => category.restaurant)
    category: Category[];

    @OneToOne(() => ResAddress, address => address.restaurant, { cascade: true, eager: true })
    address: ResAddress;

    @OneToOne(() => User, user => user.restaurant, { nullable: true })
    @JoinColumn()
    owner: User;
}