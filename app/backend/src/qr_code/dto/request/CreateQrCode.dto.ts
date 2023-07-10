import { IsInt, IsNotEmpty } from "class-validator";

export class CreateQrCodeDto {
    @IsNotEmpty()
    @IsInt()
    table_id: number;
}