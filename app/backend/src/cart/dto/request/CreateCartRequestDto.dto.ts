import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CartStatus, PickupType } from "src/cart/entity/cart.entity";


export class CreateCartRequestDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsEnum(CartStatus)
    status: CartStatus;
    
    @IsEnum(PickupType)
    pickup_type: PickupType;

    @IsNotEmpty()
    @IsNumber()
    total_price: number;

    @IsNotEmpty()
    @IsNumber()
    total_item: number;

    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;

    @IsNotEmpty()
    @IsNumber()
    tableNo: number;  

}