import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateOrderStatusResponseDto } from './dto/response/CreateOrderStatusResponseDto.dto';
import { OrderStatus } from './entity/orderStatus.entity';
import { OrderStatusService } from './order_status.service';

@Controller('order-status')
export class OrderStatusController {
    constructor(private readonly orderStatusService: OrderStatusService) {}

    // Get all order status
    @Get()
    async findAll(): Promise<OrderStatus[]> {
        return this.orderStatusService.findAll();
    }

    //Get order by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<OrderStatus> {
        const orderStatus = await this.orderStatusService.findOne(id);
        if(!orderStatus) {
            throw new NotFoundException('Order status not found!');
        } else {
            return orderStatus;
        }
    }

    //Create order
    @Post('create')
    createOrderStatus(@Body() createOrderStatusDto: CreateOrderStatusResponseDto) {
        console.log(createOrderStatusDto);
        return this.orderStatusService.create(createOrderStatusDto)
    }

    //Update order
    @Put(':id')
    async update( @Param('id') id: number, @Body() orderStatus: OrderStatus): Promise<any> {
        return this.orderStatusService.update(id, orderStatus);
    }

    //Delete order
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if order does not exist
        const orderStatus = await this.orderStatusService.findOne(id);
        if (!orderStatus) {
            throw new NotFoundException('Order status does not exist');
        }
        return this.orderStatusService.delete(id);
    }
}