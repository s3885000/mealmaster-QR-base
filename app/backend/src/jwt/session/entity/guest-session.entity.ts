import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class GuestSession {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    sessionId: number;

    @Column({ unique: true })
    guestId: string;

    @Column()
    token: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    lastUsed: Date;

}