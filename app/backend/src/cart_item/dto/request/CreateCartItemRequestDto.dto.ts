import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MenuItem } from "src/menu_items/entity/menu_item.entity";


export class CreateCartItemRequestDto {
    menuItem: MenuItem;
    
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