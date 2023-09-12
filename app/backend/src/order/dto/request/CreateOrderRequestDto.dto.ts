import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PickupType } from "src/order/entity/order.entity";


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
    @IsNumber()
    total_price: number;
    
    @IsEnum(PickupType)
    pickup_type: PickupType;
}