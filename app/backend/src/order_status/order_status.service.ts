import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './entity/orderStatus.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrderStatusService {
    private readonly logger = new Logger(OrderStatusService.name);

    constructor(
        @InjectRepository (OrderStatus)
        private orderStatusRepository: Repository<OrderStatus>,
        private orderService: OrderService
    ) {}

    async update (order_id: string, status: string): Promise<OrderStatus> {
        const order = await this.orderService.findOne(order_id);

        if(!order) {
            throw new NotFoundException('Order not found!');
        }

        const orderStatus = new OrderStatus();
        orderStatus.status = status;
        orderStatus.order = order;
        orderStatus.timestamp = new Date();

        return this.orderStatusRepository.save(orderStatus);
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        this.logger.debug('Called when the current second is 1');
        await this.deleteOldStatuses();

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
