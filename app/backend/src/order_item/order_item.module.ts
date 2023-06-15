import { Controller, Module } from '@nestjs/common';
import { OrderItemController } from './order_item.controller';
import { OrderItemService } from './order_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/orderItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    controllers: [OrderItemController],
    providers: [OrderItemService]
})
export class OrderItemModule {}
