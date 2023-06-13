import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entity/user.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    user_id: number

    @Column()
    address_id: number;

    @Column()
    logo: string;

    @Column()
    res_banner: string;
}