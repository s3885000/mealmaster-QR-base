import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateOrderRequestDto {
    @IsNotEmpty()
    @IsNumber()
    restaurant_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    table_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    payment_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    
    @IsNotEmpty()
    @IsString()
    current_status: string;
    
    @IsNotEmpty()
    @IsNumber()
    total_price: number;
    
    @IsNotEmpty()
    @IsNumber()
    pickup_type: number;
    
    @IsNotEmpty()
    @IsString()
    note: string;
}