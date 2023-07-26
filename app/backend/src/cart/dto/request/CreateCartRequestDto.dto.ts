import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartRequestDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    pickup_type: number;

    @IsString()
    @IsNotEmpty()
    selected_payment_method: string;

    @IsNumber()
    @IsNotEmpty()
    total_price: number;

    @IsNumber()
    @IsNotEmpty()
    total_item: number;

    @IsString()
    @IsNotEmpty()
    note: string;
}