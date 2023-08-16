import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCartItemRequestDto {
  @IsNotEmpty()
  @IsNumber()
  menuItemId: number;
  
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  
  @IsOptional()
  @IsString()
  note: string;
}