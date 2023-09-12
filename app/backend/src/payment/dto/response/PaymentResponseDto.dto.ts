

export class PaymentResponseDto {
    id: number;
    order_id: number;
    user_id: number;
    payment_id: string;
    payment_method: string;
    payment_status: string;
    payment_amount: number;
    create_at: Date;
    update_at: Date;

}