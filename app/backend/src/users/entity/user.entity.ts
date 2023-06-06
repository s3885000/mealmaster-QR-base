import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type UserRole = 'client' | 'resOwner';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}