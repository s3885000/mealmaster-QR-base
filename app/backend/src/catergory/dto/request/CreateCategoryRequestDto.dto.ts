import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryRequestDto {
    @IsNumber()
    @IsNotEmpty()
    restaurant_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}