import { IsNumber, IsString } from "class-validator";


export class UpdatePaymentRequestDto {
    @IsString()
    payment_status?: string;

    @IsNumber()
    payment_amount?: number;
}