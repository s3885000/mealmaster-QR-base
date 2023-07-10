import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateTableDto {
    @IsNotEmpty()
    @IsInt()
    restaurant_id: number;

    @IsNotEmpty()
    @IsInt()
    table_no: number;

    @IsOptional()
    @IsString()
    description?: string;
}