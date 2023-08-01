import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCartRequestDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    status: string;
    
    @IsNotEmpty()
    @IsNumber()
    pickup_type: number;

    @IsNotEmpty()
    @IsString()
    selected_payment_method: string;

    @IsNotEmpty()
    @IsNumber()
    total_price: number;

    @IsNotEmpty()
    @IsNumber()
    total_item: number;

    @IsNotEmpty()
    @IsString()
    note: string;
}