import { Cart } from "src/cart/entity/cart.entity";
import { MenuItem } from "src/menu_items/entity/menu_item.entity";

export class CreateCartItemResponseDto {
    id: number;
    menuItem: MenuItem;
    quantity: number;
    note: string;
    price: number;
    cart: Cart;
  }
  