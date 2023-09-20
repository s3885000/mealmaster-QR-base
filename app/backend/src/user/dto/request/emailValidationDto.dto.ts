import { IsEmail, IsNotEmpty } from "class-validator";


export class emailValidateDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}