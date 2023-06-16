import { IsNotEmpty, Length, MinLength } from "class-validator";
import { IsPhoneNumberOrEmail } from "./is-phoneNo-or-Email.decorator";
import { UserRole } from "../entity/user.entity";


export class CreateUserDto {
    @IsPhoneNumberOrEmail('email')
    @IsNotEmpty()
    @Length(10, 10, { message: 'Phone number must be 10 digits'})
    phoneNumber: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters'})
    password: string;

    @IsNotEmpty()
    role: UserRole.CUSTOMER;
    
}

