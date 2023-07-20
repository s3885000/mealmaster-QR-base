import { User } from "src/user/entity/user.entity";

export class CreateCartResponseDto {
    id: number;
    status: string;
    pickup_type: number;
    selected_payment_method: string;
    total_price: number;
    total_item: number;
    note: string;
    user: User;
}