import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateOrderItemRequestDto {
    @IsNotEmpty()
    @IsNumber()
    order_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    menu_item_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @IsOptional()
    @IsString()
    note: string;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
}