import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateMenuItemRequestDto {
    @IsOptional()
    @IsNumber()
    category_id?: number;
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNotEmpty()
    description?: string;
  
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true})
    images?: string[];
  
    @IsOptional()
    @IsBoolean()
    is_best_seller?: boolean;
  
    @IsBoolean()
    @IsOptional()
    status?: boolean = true;
}
