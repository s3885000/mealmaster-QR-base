import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/request/CreateOrderRequestDto.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { CreateOrderResponseDto } from './dto/response/CreateOrderResqonseDto.dto';
import { UpdateOrderRequestDto } from './dto/request/UpdateOrderRequestDto.dto';
import { OrderStatus } from 'src/order_status/entity/orderStatus.entity';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    //Get all orders
    @Get(':userId/orders')
    async findAll(@Body('userId') userId: number): Promise<Order[]> {
        return this.orderService.findAll(userId);
    }

    //Get order by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<Order> {
        const order = await this.orderService.findOne(id);
        if(!order) {
            throw new NotFoundException('Order not found!');
        } else {
            return order;
        }
    }

    //Create order
    @Post('create')
    createOrder(@Body() createOrderRequestDto: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
        return this.orderService.create(createOrderRequestDto)
    }

    //Update order
    @Patch(':id')
    async update( @Param('id') id: number, @Body() updateOrderRequestDto: UpdateOrderRequestDto) {
        return this.orderService.update(id, updateOrderRequestDto)
    }

    @Get(':id/status')
    async getOrderStatus(@Param('id') id: number): Promise<OrderStatus> {
        const orderStatus = await this.orderService.getOrderStatus(id);
        if (!orderStatus) {
            throw new NotFoundException('Order status not found!');
        } else {
            return orderStatus;
        }
    }
    @Get(':userId/ongoing-orders-owner')
    async findAllOngoingOrdersForOwner(@Param('userId') userId: number): Promise<Order[]> {
        return this.orderService.findAllOngoingOrdersForOwner(userId);
    }

    @Get(':userId/ongoing-orders')
    async findAllOngoingOrders(@Param('userId') userId: number): Promise<Order[]> {
        return this.orderService.findAllOngoingOrders(userId);
    }

    @Get(':userId/completed-orders')
    async findAllCompletedOrders(@Param('userId') userId: number): Promise<Order[]> {
        return this.orderService.findAllCompletedOrders(userId);
    }

    //Delete order
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