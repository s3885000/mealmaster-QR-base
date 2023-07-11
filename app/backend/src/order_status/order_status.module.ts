import { Module } from '@nestjs/common';
import { OrderStatusController } from './order_status.controller';
import { OrderStatusService } from './order_status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entity/orderStatus.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderStatus])],
    controllers: [OrderStatusController],
    providers: [OrderStatusService],
})
export class OrderStatusModule {}
