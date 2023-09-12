import { Body, Controller, Delete, Param, Patch, Post, Put } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { UpdateOrderStatusDto } from './dto/UpdateOrderStatusDto.dto';
import { DeleteOrderStatusDto } from './dto/DeleteOrderStatusDto.dto';
import { OrderStatus } from './entity/orderStatus.entity';

@Controller('order-status')
export class OrderStatusController {
    constructor( private readonly orderStatusService: OrderStatusService) {}

    @Patch(':orderId')
    async updateOrderStatus(
        @Param('orderId') orderId: number,
        @Body() updateOrderStatusDto: UpdateOrderStatusDto
    ): Promise<OrderStatus> {
        return this.orderStatusService.update(orderId, updateOrderStatusDto.status);
    }

    @Patch(':orderId/progress')
    async progressOrderStatus(
        @Param('orderId') orderId: number
    ): Promise<OrderStatus> {
        console.log(`Received request to progress order status for order ID: ${orderId}`);
        return this.orderStatusService.progressOrderStatus(orderId);
    }

    @Put(':orderId/complete')
    async markOrderAsCompleted(
        @Param('orderId') orderId: number
    ): Promise<OrderStatus> {
        return this.orderStatusService.markOrderAsCompleted(orderId);
    }

    @Delete('order-status')
    deleteOrderStatus (@Body()deleteOrderStatusDto: DeleteOrderStatusDto) {
        return this.orderStatusService.delete(deleteOrderStatusDto.orderStatusId)
    }
}
