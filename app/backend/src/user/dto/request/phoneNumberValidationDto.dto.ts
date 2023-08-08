import { IsNotEmpty, Length } from "class-validator";


export class phoneNumberValidateDto {
    @IsNotEmpty()
    @Length(10, 10, { message: "Phone number must be at least 10 digits"})
    phone_number: string;
}