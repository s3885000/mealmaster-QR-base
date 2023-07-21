import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { PickupType } from "src/order/entity/order.entity";


export class UpdateOrderRequestDto {
    @IsOptional()
    @IsNumber()
    restaurant_id?: number;

    @IsOptional()
    @IsNumber()
    table_id?: number;

    @IsOptional()
    @IsNumber()
    payment_id?: number;

    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsOptional()
    @IsNumber()
    total_price?: number;

    @IsEnum(PickupType)
    pickup_type?: PickupType;

    @IsOptional()
    @IsString()
    note?: string;
}