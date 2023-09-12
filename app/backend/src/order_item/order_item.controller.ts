import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateOrderItemRequestDto } from './dto/request/CreateOrderItemRequestDto.dto';
import { OrderItem } from './entity/orderItem.entity';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemResponseDto } from './dto/response/CreateOrderItemResponseDto.dto';

@Controller('order_item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    //Get all order items
    @Get()
    async findAll(): Promise<OrderItem[]> {
        return this.orderItemService.findAll();
    }

    //Get order item by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<OrderItem> {
        const order_item = await this.orderItemService.findOne(id);
        if(!order_item) {
            throw new NotFoundException('Order item not found!');
        } else {
            return order_item;
        }
    }

    //Create order item
    @Post('/:orderId/order-items')
    createOrderItem(@Body() createOrderItemDto: CreateOrderItemRequestDto, @Param('orderId') orderId: number): Promise<CreateOrderItemResponseDto> {
      return this.orderItemService.create(createOrderItemDto, orderId);
    }

    //Update order item
    @Put(':id')
    async update( @Param('id') id: number, @Body() orderItem: OrderItem): Promise<any> {
        return this.orderItemService.update(id, orderItem);
    }

    //Delete order item
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if order item does not exist
        const order = await this.orderItemService.findOne(id);
        if (!order) {
            throw new NotFoundException('Order does not exist');
        }
        return this.orderItemService.delete(id);
    }
}