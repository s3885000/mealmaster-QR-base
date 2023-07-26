import { IS_ALPHA, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRestaurantRequestDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    logo: string;

    @IsString()
    @IsNotEmpty()
    banner: string;
}