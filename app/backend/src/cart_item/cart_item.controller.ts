import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItem } from './entity/cart_item.entity';
import { CreateCartItemRequestDto } from './dto/request/CreateCartItemRequestDto.dto';
import { CreateCartItemResponseDto } from './dto/response/CreateCartItemResponseDto.dto';

@Controller('cart_item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  // Get all cart items
  @Get()
  async findAll(): Promise<CartItem[]> {
    return this.cartItemService.findAll();
  }

  // Get cart item by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CartItem> {
    const cartItem = await this.cartItemService.findOne(id);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found!');
    } else {
      return cartItem;
    }
  }

  // Create cart item
  @Post('create')
  createCartItem(@Body() createCartItemDto: CreateCartItemRequestDto, @Body('cartId') cartId: number): Promise<CreateCartItemResponseDto> {
    return this.cartItemService.create(createCartItemDto, cartId);
  }

  // Update cart item
  @Put(':id')
  async update(@Param('id') id: number, @Body() createCartItemDto: CreateCartItemRequestDto): Promise<any> {
    return this.cartItemService.update(id, createCartItemDto);
  }

  // Delete cart item
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    // Handle the error if cart item does not exist
    const cartItem = await this.cartItemService.findOne(id);
    if (!cartItem) {
      throw new NotFoundException('Cart item does not exist!');
    }
    return this.cartItemService.delete(id);
  }
}
