import { Module } from '@nestjs/common';
import { OrderStatusController } from './order_status.controller';
import { OrderStatusService } from './order_status.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entity/orderStatus.entity';
import { OrderModule } from 'src/order/order.module';
import { OrdersModule } from 'src/webSocket/orders.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([OrderStatus]),
    OrderModule,
    OrdersModule,
  ],
  controllers: [OrderStatusController],
  providers: [OrderStatusService]
})
export class OrderStatusModule {}
