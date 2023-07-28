import { IsNumber, IsString } from "class-validator";
import { Order } from "src/order/entity/order.entity";


export class CreatePaymenRequestDto {
    @IsNumber()
    order_id: number;

    @IsNumber()
    user_id: number;

    @IsString()
    payment_ref_id: string;

    @IsString()
    payment_method: string;

    @IsString()
    payment_status: string;

    @IsNumber()
    payment_amount: number;
    
}