import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateCategoryRequestDto {
    @IsNotEmpty()
    @IsInt()
    restaurant_id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;
}