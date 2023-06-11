import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Session {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    userId: string;

    @Column()
    token: string;

}