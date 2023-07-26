import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';
import { CreateCartResponseDto } from './dto/response/CreateCartResponse.dto';
import { CreateCartRequestDto } from './dto/request/CreateCartRequestDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { User, UserRole } from 'src/user/entity/user.entity';

@Controller('cart')
@UseGuards(AuthGuard, RolesGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    //Get all carts
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    //Get cart by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Cart> {
        const cart = await this.cartService.findOne(id);
        if(!cart) {
            throw new NotFoundException('Cart not found!');
        } else {
            return cart;
        }
    }

    //Create cart
    @Roles(UserRole.CUSTOMER, UserRole.GUEST)
    @Post('create/:userId')
    create(@Param('userId') userId: number, @Body() createCartDto: CreateCartRequestDto) {
        console.log(createCartDto);
        return this.cartService.create(createCartDto, userId);
    }

    //Update cart
    @Roles(UserRole.CUSTOMER, UserRole.GUEST)
    @Put('update/:restaurantId')
    async update( @Param('restaurantId') restaurantId: number, @Body() createCartDro: CreateCartRequestDto): Promise<any> {
        return this.cartService.update(restaurantId, createCartDro);
    }

    //Delete cart
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
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