import { Category } from "src/catergory/entity/category.entity";

export class UpdateMenuItemResponseDto {
    id: number;
    category: Category;
    name: string;
    description: string;
    price: number;
    images: string[];
    is_best_seller: boolean;
    status: boolean;
  }
  