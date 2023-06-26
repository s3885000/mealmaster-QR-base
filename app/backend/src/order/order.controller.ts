import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    //Get all orders
    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
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
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        console.log(createOrderDto);
        return this.orderService.create(createOrderDto)
    }

    //Update order
    @Put(':id')
    async update( @Param('id') id: number, @Body() order: Order): Promise<any> {
        return this.orderService.update(id, order);
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