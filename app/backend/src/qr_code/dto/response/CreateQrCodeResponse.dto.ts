import { Tables } from "src/table/entity/table.entity";

export class CreateQrCodeResponseDto {
    id: number;
    code_image: string;
    table: Tables;
}