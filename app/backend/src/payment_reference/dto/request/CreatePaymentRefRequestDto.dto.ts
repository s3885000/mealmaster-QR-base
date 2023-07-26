import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentRefRequestDto {
    @IsNumber()
    @IsNotEmpty()
    cart_id: number;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    payment_ref: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}