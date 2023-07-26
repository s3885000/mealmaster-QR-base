import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderStatusRequestDto {
    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @IsString()
    @IsNotEmpty()
    status: string;
}