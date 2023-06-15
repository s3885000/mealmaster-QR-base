import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateRestaurantOwnerDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}