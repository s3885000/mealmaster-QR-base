import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderRequestDto {
    @IsNumber()
    @IsNotEmpty()
    restaurant_id: number;

    @IsNumber()
    @IsNotEmpty()
    table_id: number;

    @IsNumber()
    @IsNotEmpty()
    payment_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    current_status: string;

    @IsNumber()
    @IsNotEmpty()
    total_price: number;

    @IsNumber()
    @IsNotEmpty()
    pickup_type: number;

    @IsString()
    @IsNotEmpty()
    note: string;
}