export class CreateOrderDto {
    restaurant_id: number;
    table_id: number;
    user_id: number;
    order_date: Date;
    current_state: string;
    total_amount: number;
}