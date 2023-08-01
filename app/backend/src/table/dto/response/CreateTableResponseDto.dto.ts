import { Restaurant } from "src/restaurant/entity/restaurant.entity";

export class createTableResponseDto {
    restaurant_id: number;
    table_no: number;
    qr_code_id: number;
    description: string;
}