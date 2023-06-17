import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserProfileResponseDto } from "../dto/user-response/userProfileResponse.dto";

export enum UserRole {
    CUSTOMER = 'customer',
    RESTAURANT_OWNER = 'restaurant-owner',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true, nullable: true, default: null })
    phoneNumber: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER})
    role: UserRole;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    profile_picture: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    toResponseObject(): UserProfileResponseDto {
        const { id, first_name, last_name, profile_picture, phoneNumber, email, role } = this;
        return { id, first_name, last_name, profile_picture, phoneNumber, email, role };
    }

}
