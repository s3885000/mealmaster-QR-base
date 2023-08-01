import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';
import { CreateCartRequestDto } from './dto/request/CreateCartRequestDto.dto';
import { CreateCartResponseDto } from './dto/response/CreateCartResponseDto.sto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    // Get cart by id
    @Get(':id')
    async findOne(@Param('id') id:number): Promise<Cart> {
        const cart = await this.cartService.findOne(id);
        if(!cart) {
            throw new NotFoundException('Cart not found!')
        } else {
            return cart;
        }
    }

    // Create cart
    @Post('create')
    async create(@Body() createCartDto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
        return this.cartService.create(createCartDto);
    }

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