import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateRestaurantOwnerDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters'})
    password: string;


}