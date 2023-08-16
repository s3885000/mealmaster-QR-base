import { CartStatus, PickupType } from "src/cart/entity/cart.entity";
import { User } from "src/user/entity/user.entity";

export class CreateCartResponseDto {
    id: number;
    status: CartStatus;
    pickup_type: PickupType;
    total_price: number;
    total_item: number;
    user: User;
}