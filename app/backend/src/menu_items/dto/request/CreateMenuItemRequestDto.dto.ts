import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";


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
    @IsNumber()
    price: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true})
    images: string[];
  
    @IsNotEmpty()
    @IsBoolean()
    is_best_seller: boolean;
  
    @IsBoolean()
    @IsOptional()
    status?: boolean = true;
}
