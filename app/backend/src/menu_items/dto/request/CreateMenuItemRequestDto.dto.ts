import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";


export class CreateMenuItemRequestDto {
    @IsNotEmpty()
    @IsNumber()
    category_id: number;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    price: string;
  
    @IsNotEmpty()
    @IsUrl()
    image: string;
  
    @IsNotEmpty()
    @IsBoolean()
    is_best_seller: boolean;
  
    @IsBoolean()
    @IsOptional()
    status?: boolean = true;
}
