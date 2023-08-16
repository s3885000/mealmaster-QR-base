import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItem } from './entity/cart_item.entity';
import { CreateCartItemRequestDto } from './dto/request/CreateCartItemRequestDto.dto';
import { CreateCartItemResponseDto } from './dto/response/CreateCartItemResponseDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateCartItemRequestDto } from './dto/request/UpdateCartItemRequestDto.dto';

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

  // Find items for active cart by user id  
  @Get('user/:userId/active')
  async findItemsForActiveCartByUserId(@Param('userId') userId:number): Promise <CartItem[]> {
    return this.cartItemService.findItemsForActiveCartByUserId(userId);
  }

  @UseGuards(AuthGuard)
  // Create cart item
  @Post('create')
  createCartItem(@Body() createCartItemDto: CreateCartItemRequestDto, @Body('userId') userId: number): Promise<CreateCartItemResponseDto> {
    return this.cartItemService.create(createCartItemDto, userId);
  }

  // Update cart item
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCartItemDto: UpdateCartItemRequestDto): Promise<any> {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  // Delete cart item
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    console.log("Trying to delete cart item with ID:", id);
    // Handle the error if cart item does not exist
    const cartItem = await this.cartItemService.findOne(id);
    if (!cartItem) {
      throw new NotFoundException('Cart item does not exist!');
    }
    return this.cartItemService.delete(id);
  }
}
