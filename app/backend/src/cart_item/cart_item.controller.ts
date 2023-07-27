import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCartItemResponseDto } from './dto/response/CreateCartItemResponseDto.dto';
import { CreateCartItemRequestDto } from './dto/request/CreateCartItemRequestDto.dto';
import { CartItem } from './entity/cartItem.entity';
import { CartItemService } from './cart_item.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { User, UserRole } from 'src/user/entity/user.entity';

@Controller('cart-item')
@UseGuards(AuthGuard, RolesGuard)
export class CartItemController {
    constructor(private readonly cartItemService: CartItemService) {}

    //Get all cart items
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.GUEST, UserRole.CUSTOMER)
    @Get()
    async findAll(): Promise<CartItem[]> {
        return this.cartItemService.findAll();
    }

    //Get cart item by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.GUEST, UserRole.CUSTOMER)
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
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.GUEST, UserRole.CUSTOMER)
    @Post('create/:cartId')
    createCartItem(@Param('cartId') cartId: number, @Body() createCartItemDto: CreateCartItemRequestDto) {
        console.log(createCartItemDto);
        return this.cartItemService.create(createCartItemDto, cartId)
    }

    //Update cart item
    // @Roles(UserRole.RESTAURANT_OWNER, UserRole.GUEST, UserRole.CUSTOMER)
    // @Put(':id')
    // async update( @Param('id') id: number, @Body() createCartItemDto: CreateCartItemRequestDto): Promise<any> {
    //     return this.cartItemService.update(id, createCartItemDto);
    // }

    //Delete cart item
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.GUEST, UserRole.CUSTOMER)
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