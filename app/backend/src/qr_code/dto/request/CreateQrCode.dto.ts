import { IsNotEmpty } from "class-validator";
import { Tables } from "src/table/entity/table.entity";

export class CreateQrCodeDto {
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    table: Tables;
}