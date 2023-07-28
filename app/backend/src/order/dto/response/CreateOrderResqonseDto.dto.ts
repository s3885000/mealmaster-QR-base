import { PickupType } from "src/order/entity/order.entity";
import { CreateOrderItemResponseDto } from "src/order_item/dto/response/CreateOrderItemResponseDto.dto";
import { Payment } from "src/payment/entity/payment.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Tables } from "src/table/entity/table.entity";
import { User } from "src/user/entity/user.entity";

export class CreateOrderResponseDto {
    id: number;
    unique_id: string;
    restaurant: Restaurant;
    table: Tables;
    payment: Payment;
    user: User;
    total_price: number;
    pickup_type: PickupType;
    note: string;
    created_at: Date;
    updated_at: Date;
    order_items: CreateOrderItemResponseDto[];

}