import { Body, Controller, Delete, Post } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { UpdateOrderStatusDto } from './dto/UpdateOrderStatusDto.dto';
import { DeleteOrderStatusDto } from './dto/DeleteOrderStatusDto.dto';

@Controller('order-status')
export class OrderStatusController {
    constructor( private readonly orderStatusService: OrderStatusService) {}

    @Post('order-status')
    updateOrderStatus (@Body()updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.orderStatusService.update(updateOrderStatusDto.order_id, updateOrderStatusDto.status)
    }

    @Delete('order-status')
    deleteOrderStatus (@Body()deleteOrderStatusDto: DeleteOrderStatusDto) {
        return this.orderStatusService.delete(deleteOrderStatusDto.orderStatusId)
    }
}
