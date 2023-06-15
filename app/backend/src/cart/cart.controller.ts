import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    //Update cart
    @Put(':id')
    async update( @Param('id') id: number, @Body() cart: Cart): Promise<any> {
        return this.cartService.update(id, cart);
    }

    //Delete cart
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if cart does not exist
        const cart = await this.cartService.findOne(id);
        if (!cart) {
            throw new NotFoundException('cart does not exist');
        }
        return this.cartService.delete(id);
    }
}