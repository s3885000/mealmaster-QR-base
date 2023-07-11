import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateResAddressRequestDto {
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    ward: string;
}