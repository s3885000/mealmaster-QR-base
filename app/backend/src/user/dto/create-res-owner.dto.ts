import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsPhoneNumberOrEmail } from "./is-phoneNo-or-Email.decorator";
import { UserRole } from "../entity/user.entity";


export class CreateRestaurantOwnerDto {
    @IsPhoneNumberOrEmail('phoneNumber')
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters'})
    password: string;

    @IsNotEmpty()
    role: UserRole.RESTAURANT_OWNER;
}