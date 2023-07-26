import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentRequestDto {
    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    payment_ref_is: number;

    @IsString()
    @IsNotEmpty()
    payment_method: string;

    @IsString()
    @IsNotEmpty()
    payment_status: string;

    @IsNumber()
    @IsNotEmpty()
    payment_amount: number;    
}