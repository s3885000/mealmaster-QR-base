import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    refreshToken: string;

}