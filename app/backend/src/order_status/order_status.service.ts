import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus, Status } from './entity/orderStatus.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Server } from 'socket.io';
import { OrdersGateway } from 'src/webSocket/orders.gateway';

@Injectable()
export class OrderStatusService {
    private readonly logger = new Logger(OrderStatusService.name);

    constructor(
        @InjectRepository (OrderStatus)
        private orderStatusRepository: Repository<OrderStatus>,
        private orderService: OrderService,
        private readonly ordersGateway: OrdersGateway,
    ) {}

    async update(order_id: number, status: string): Promise<OrderStatus> {
        const order = await this.orderService.findOne(order_id);
    
        if (!order) {
            throw new NotFoundException('Order not found!');
        }
    
        const orderStatus = new OrderStatus();
        orderStatus.status = status;
        orderStatus.order = order;
        orderStatus.timestamp = new Date();
    
        const savedOrderStatus = await this.orderStatusRepository.save(orderStatus);

        return savedOrderStatus;
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        this.logger.debug('Called when the current second is 1');
        await this.deleteOldStatuses();

    }



    async progressOrderStatus(orderId: number): Promise<OrderStatus> {
        const order = await this.orderService.findOne(orderId);
        if (!order) {
            throw new NotFoundException('Order not found!');
        }
    
        const currentStatus = await this.orderService.getOrderStatus(orderId);
        if (!currentStatus) {
            throw new Error('Order status not found for given order ID.');
        }
    
        let nextStatus: Status;
    
        console.log(`Current status for order ID ${orderId}: ${currentStatus.status}`);
    
        switch (currentStatus.status) {
            case Status.ORDER_PENDING_ACCEPTANCE:  
                nextStatus = Status.ORDER_CONFIRMED;
                break;
            case Status.ORDER_CONFIRMED:
                nextStatus = Status.ORDER_IN_PROGRESS;
                break;
            case Status.ORDER_IN_PROGRESS:
                nextStatus = Status.ORDER_READY;
                break;
            case Status.ORDER_READY:
                throw new Error('Order is already in the final stage.');
            default:
                throw new Error('Invalid order status.');
        }
    
        console.log(`Determined next status for order ID ${orderId}: ${nextStatus}`);
    
        // Emit the update using the ordersGateway:
        this.ordersGateway.updateOrderStatus(String(order.user.id), String(orderId), nextStatus);
    
        return this.update(orderId, nextStatus);
    }

    async markOrderAsCompleted(orderId: number): Promise<OrderStatus> {
        this.logger.log(`Attempting to mark order ID: ${orderId} as completed.`);
        
        const order = await this.orderService.findOne(orderId);
        if (!order) {
            this.logger.error(`Order ID: ${orderId} not found when attempting to mark as completed.`);
            throw new NotFoundException('Order not found!');
        }
        
        const updatedOrderStatus = await this.update(orderId, Status.ORDER_COMPLETED);
        
        this.logger.log(`Successfully marked order ID: ${orderId} as completed.`);
        
        return updatedOrderStatus;
    }
    
    async deleteOldStatuses() {
        const oneDayAgo = new Date(Date.now() - 24*60*60*1000);

        await this.orderStatusRepository
            .createQueryBuilder()
            .delete()
            .from(OrderStatus)
            .where("timestamp < :oneDayAgo", { oneDayAgo })
            .execute();

    }


    async delete (orderStatusId: number): Promise<void> {
        await this.orderStatusRepository.delete(orderStatusId)
    }
}
