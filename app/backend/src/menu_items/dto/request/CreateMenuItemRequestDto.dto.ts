import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMenuItemRequestDto {
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    description: number;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsNumber()
    @IsNotEmpty()
    is_best_seller: number;

    @IsString()
    @IsNotEmpty()
    status: string;
}