import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MenuItem } from "src/menu_items/entity/menu_item.entity";


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