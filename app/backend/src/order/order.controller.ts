import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateOrderResponseDto } from './dto/response/CreateOrderResponseDto.dto';
import { CreateOrderRequestDto } from './dto/request/CreateOrderRequestDto.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';


@Controller('order')
@UseGuards(AuthGuard, RolesGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    //Get all orders
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    //Get order by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Order> {
        const order = await this.orderService.findOne(id);
        if(!order) {
            throw new NotFoundException('Order not found!');
        } else {
            return order;
        }
    }

    //Create order
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Post('create')
    createOrder(@Body() createOrderDto: CreateOrderResponseDto) {
        console.log(createOrderDto);
        return this.orderService.create(createOrderDto)
    }

    //Update order
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Put(':id')
    async update( @Param('id') id: number, @Body() order: Order): Promise<any> {
        return this.orderService.update(id, order);
    }

    //Delete order
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if order does not exist
        const order = await this.orderService.findOne(id);
        if (!order) {
            throw new NotFoundException('Order does not exist');
        }
        return this.orderService.delete(id);
    }
}