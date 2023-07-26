export class CreateCartResponseDto {
    id: number;
    user_id: number;
    status: string;
    pickup_type: number;
    selected_payment_method: string;
    total_price: number;
    total_item: number;
    note: string;
}