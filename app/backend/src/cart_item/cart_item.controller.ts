import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/CreateCartItem.dto';
import { CartItem } from './entity/cartItem.entity';
import { CartItemService } from './cart_item.service';

@Controller('cart-item')
export class CartItemController {
    constructor(private readonly cartItemService: CartItemService) {}

    //Get all cart items
    @Get()
    async findAll(): Promise<CartItem[]> {
        return this.cartItemService.findAll();
    }

    //Get cart item by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CartItem> {
        const cartItem = await this.cartItemService.findOne(id);
        if(!cartItem) {
            throw new NotFoundException('Cart item not found!');
        } else {
            return cartItem;
        }
    }

    //Create cart item
    @Post('create')
    createCartItem(@Body() createCartItemDto: CreateCartItemDto) {
        console.log(createCartItemDto);
        return this.cartItemService.create(createCartItemDto)
    }

    //Update cart item
    @Put(':id')
    async update( @Param('id') id: number, @Body() cartItem: CartItem): Promise<any> {
        return this.cartItemService.update(id, cartItem);
    }

    //Delete cart item
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if cart item does not exist
        const cartItem = await this.cartItemService.findOne(id);
        if (!cartItem) {
            throw new NotFoundException('Cart item does not exist');
        }
        return this.cartItemService.delete(id);
    }
}