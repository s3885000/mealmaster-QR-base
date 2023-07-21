import { Module } from '@nestjs/common';
import { OrderStatusController } from './order_status.controller';
import { OrderStatusService } from './order_status.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [OrderStatusController],
  providers: [OrderStatusService]
})
export class OrderStatusModule {}
