export class CreatePaymentDto {
    order_id: number;
    user_id: number;
    payment_ref_is: number;
    payment_method: string;
    payment_status: string;
    payment_amount: number;
}