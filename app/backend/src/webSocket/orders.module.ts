import { Module } from '@nestjs/common';
import { OrdersGateway } from './orders.gateway';


@Module({
  imports: [],
  providers: [OrdersGateway],
  exports: [OrdersGateway]
})
export class OrdersModule {}
