import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}