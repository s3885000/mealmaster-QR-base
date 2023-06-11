import { IsNotEmpty, Length } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @Length(10, 10, { message: "Phone Number must be 10 digits"})
    phoneNumber: string;

    @IsNotEmpty()
    password: string;
}