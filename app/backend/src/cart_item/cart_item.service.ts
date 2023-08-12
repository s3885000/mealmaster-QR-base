import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./entity/cart_item.entity";
import { CreateCartItemRequestDto } from "./dto/request/CreateCartItemRequestDto.dto";
import { CreateCartItemResponseDto } from "./dto/response/CreateCartItemResponseDto.dto";
import { MenuItemsService } from "src/menu_items/menu_items.service";
import { CartService } from "src/cart/cart.service";



@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private readonly menuItemService: MenuItemsService,
    private readonly cartService: CartService,
  ) {}

  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  async findOne(id: number): Promise<CartItem> {
    return this.cartItemRepository.findOne({ where: { id } });
  }

  async create(createCartItemDto: CreateCartItemRequestDto, cartId: number): Promise<CreateCartItemResponseDto> {
    const { menuItem, quantity, note, price } = createCartItemDto;

    const menuItemExists = await this.menuItemService.findOne(menuItem.id);
    if (!menuItemExists) {
      throw new NotFoundException('Menu item not found!');
    }

    const cart = await this.cartService.findOne(cartId);
    if(!cart) {
      throw new NotFoundException('Cart not found!');
    }

    const cartItem = new CartItem();
    cartItem.menuItem = menuItemExists;
    cartItem.cart = cart
    cartItem.quantity = quantity;
    cartItem.note = note;
    cartItem.price = price;

    await this.cartItemRepository.save(cartItem);

    // Update the cart's total_price and total_item after adding the new cart item
    const updatedTotalPrice = cart.total_price += cartItem.price * cartItem.quantity;
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

  async update(id: number, createCartItemDto: CreateCartItemRequestDto): Promise<CreateCartItemResponseDto> {
    const { menuItem, quantity, note, price } = createCartItemDto;

    const existingCartItem = await this.cartItemRepository.findOne({ where: { id }});
    if(!existingCartItem) {
      throw new NotFoundException('Cart item not found!')
    }

    const menuItemExists= await this.menuItemService.findOne(menuItem.id);
    if(!menuItemExists) {
      throw new NotFoundException('Menu item not found!');
    }

    existingCartItem.menuItem = menuItemExists;
    existingCartItem.quantity = quantity;
    existingCartItem.note = note;
    existingCartItem.price = price;

    await this.cartItemRepository.save(existingCartItem);

    return existingCartItem;
  }

  async delete(id: number): Promise<void> {
    await this.cartItemRepository.delete(id);
  }
}
