import { IsNotEmpty, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(10, 10, { message: 'Phone number must be 10 digits'})
    phone_number: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters'})
    password: string;
    
}

