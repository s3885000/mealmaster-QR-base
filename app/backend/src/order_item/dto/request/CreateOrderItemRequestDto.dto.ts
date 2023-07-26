import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderItemRequestDto {
    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @IsNumber()
    @IsNotEmpty()
    menu_item_id: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    note: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
