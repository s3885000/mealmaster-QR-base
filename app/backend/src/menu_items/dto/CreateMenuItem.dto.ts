export class CreateMenuItemDto {
    category_id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    is_best_seller: number;
    create_at: Date;
    update_at: Date;
    status: string;
}