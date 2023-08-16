import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';
import { CreateCartRequestDto } from './dto/request/CreateCartRequestDto.dto';
import { CreateCartResponseDto } from './dto/response/CreateCartResponseDto.sto';
import { UpdatePickupTypeDto } from './dto/request/UpdatePickUpTypeDto.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    // Get cart by id
    @Get(':id')
    async findOne(@Param('id') id:number): Promise<Cart> {
        return this.cartService.findOne(id);
    }

    @Put(':id/pickup-type')
    async updatePickupType(@Param('id') id: number, @Body() updatePickupTypeDto: UpdatePickupTypeDto): Promise<Cart> {
        return await this.cartService.updatePickupType(id, updatePickupTypeDto.pickup_type);
    }
    

    // Create cart
    @Post('create')
    async create(@Body() createCartDto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
      const createdCart = await this.cartService.create(createCartDto);
      if (!createdCart) {
        throw new NotFoundException('Failed to create cart');
      }
      return {
        id: createdCart.id,
        user: createdCart.user,
        status: createdCart.status,  // return status
        pickup_type: createdCart.pickup_type,
        total_price: createdCart.total_price,
        total_item: createdCart.total_item,
      };
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