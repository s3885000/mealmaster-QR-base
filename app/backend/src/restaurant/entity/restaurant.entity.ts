import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    user_id: number

    @Column()
    name: string;

    @Column()
    address_id: number;

    @Column()
    logo: string;

    @Column()
    res_banner: string;
}