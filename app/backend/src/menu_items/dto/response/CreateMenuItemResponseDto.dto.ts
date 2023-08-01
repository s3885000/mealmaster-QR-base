import { Category } from "src/catergory/entity/category.entity";

export class CreateMenuItemResponseDto {
    id: number;
    category: Category;
    name: string;
    description: string;
    price: number;
    image: string;
    is_best_seller: boolean;
    status: boolean;
  }
  