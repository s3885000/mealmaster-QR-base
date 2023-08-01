export class CreateOrderItemResponseDto {
    id: number;
    order_id: number;
    menu_item_id: number;
    quantity: number;
    note: string;
    price: number;
}