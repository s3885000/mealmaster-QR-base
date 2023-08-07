import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from "./menu_item.entity";


@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_url: string;

    @ManyToOne(() => MenuItem, menuItem => menuItem.images)
    menuItem: MenuItem;
}