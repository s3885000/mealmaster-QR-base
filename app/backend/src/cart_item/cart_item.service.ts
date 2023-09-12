import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./entity/cart_item.entity";
import { CreateCartItemRequestDto } from "./dto/request/CreateCartItemRequestDto.dto";
import { CreateCartItemResponseDto } from "./dto/response/CreateCartItemResponseDto.dto";
import { MenuItemsService } from "src/menu_items/menu_items.service";
import { CartService } from "src/cart/cart.service";
import { UpdateCartItemRequestDto } from "./dto/request/UpdateCartItemRequestDto.dto";
import { Cart, CartStatus } from "src/cart/entity/cart.entity";



@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private readonly menuItemService: MenuItemsService,
    private readonly cartService: CartService,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  async findOne(id: number): Promise<CartItem> {
    return this.cartItemRepository.findOne({ where: { id } });
  }

  async findItemsForActiveCartByUserId(userId: number): Promise<CartItem[]> {
    // Get the active cart for the user
    const cart = await this.cartRepository.findOne ({ where: { user: { id : userId }, status: CartStatus.ACTIVE }});

    if(!cart) {
      throw new NotFoundException('Active cart not found for the user!');
    }

    // Get cart items associated with the active cart
    return this.cartItemRepository.find({ where: { cart: { id: cart.id }}, relations: ["menuItem", "cart"] });
  }
 
  async create(createCartItemDto: CreateCartItemRequestDto, userId: number, restaurantId: number, tableNo: number): Promise<CreateCartItemResponseDto> {
    const { quantity, note } = createCartItemDto;

    const menuItemExists = await this.menuItemService.findOne(createCartItemDto.menuItemId);
    if (!menuItemExists) {
      throw new NotFoundException('Menu item not found!');
    }

    const cart = await this.cartService.getOrCreateCartByUserId(userId, restaurantId, tableNo);
    if(!cart) {
      throw new NotFoundException('Cart not found!');
    }

    const cartItem = new CartItem();
    cartItem.menuItem = menuItemExists;
    cartItem.cart = cart
    cartItem.quantity = quantity;
    cartItem.note = note;
    cartItem.price = menuItemExists.price * quantity;

    await this.cartItemRepository.save(cartItem);

    // Update the cart's total_price and total_item after adding the new cart item
    const updatedTotalPrice = cart.total_price += cartItem.price;
    const updatedTotalItem = cart.total_item += cartItem.quantity;
    
    await this.cartService.update(cart.id, {
      total_price: updatedTotalPrice,
      total_item: updatedTotalItem,
    })

    const createCartItemResponseDto: CreateCartItemResponseDto = {
      id: cartItem.id,
      menuItem: cartItem.menuItem,
      quantity: cartItem.quantity,
      note: cartItem.note,
      price: cartItem.price,
      cart: cartItem.cart,
    };

    return createCartItemResponseDto;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemRequestDto): Promise<CreateCartItemResponseDto> {
    const existingCartItem = await this.cartItemRepository.findOne({ where: { id }, relations: ["cart"] });
    
    if (!existingCartItem) {
      throw new NotFoundException('Cart item not found!');
    }

    if (updateCartItemDto.menuItemId) {
        const menuItemExists = await this.menuItemService.findOne(updateCartItemDto.menuItemId);
        if (!menuItemExists) {
            throw new NotFoundException('Menu item not found!');
        }
        existingCartItem.menuItem = menuItemExists;
        existingCartItem.price = menuItemExists.price * (updateCartItemDto.quantity || existingCartItem.quantity);
    }

    if (updateCartItemDto.quantity) {
        existingCartItem.quantity = updateCartItemDto.quantity;
        existingCartItem.price = (existingCartItem.menuItem.price || 0) * updateCartItemDto.quantity;
    }

    if (updateCartItemDto.note) {
        existingCartItem.note = updateCartItemDto.note;
    }

    await this.cartItemRepository.save(existingCartItem);

    // Fetch all cart items for the cart
    const cartItems = await this.cartItemRepository.find({ where: { cart: { id: existingCartItem.cart.id }}});

    // Calculate new totals for the cart based on its items
    const updatedTotalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const updatedTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart with the new totals
    await this.cartService.update(existingCartItem.cart.id, { 
        total_price: updatedTotalPrice,
        total_item: updatedTotalItems,
    });

    return existingCartItem;
  }

  async delete(id: number): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id }, relations: ["cart"] });
    if (!cartItem) {
        throw new NotFoundException('Cart item not found!');
    }
    
    const cartId = cartItem.cart.id;

    await this.cartItemRepository.delete(id);
    
    // Check if there are any remaining items in the cart
    const remainingItems = await this.cartItemRepository.count({ where: { cart: { id: cartId } } });

    if (remainingItems === 0) {
        // If no items are left, delete the cart
        await this.cartService.delete(cartId);
    } else {
        // If items are left, recalculate the cart's totals
        await this.cartService.recalculateCartTotals(cartId);
    }
  }
}
