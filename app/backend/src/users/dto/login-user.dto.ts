import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { UserRole } from '../entity/user.entity';

export class LoginUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @Length(10, 10, { message: "Phone Number must be 10 digits"})
    phoneNumber?: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    role?: UserRole;
}