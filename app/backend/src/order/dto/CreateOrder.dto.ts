export class CreateOrderDto {
    restaurant_id: number;
    table_id: number;
    payment_id: number;
    user_id: number;
    current_status: string;
    total_price: number;
    pickup_type: number;
    create_at: Date;
    update_at: Date;
    note: string;
}