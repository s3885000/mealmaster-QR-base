import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCartItemRequestDto {
  @IsOptional()
  @IsNumber()
  menuItemId?: number;
  
  @IsOptional()
  @IsNumber()
  quantity?: number;
  
  @IsOptional()
  @IsString()
  note?: string;
}
