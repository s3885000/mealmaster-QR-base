import { Controller, Module, forwardRef } from '@nestjs/common';
import { OrderItemController } from './order_item.controller';
import { OrderItemService } from './order_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/orderItem.entity';
import { MenuItemsModule } from 'src/menu_items/menu_items.module';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [
        forwardRef(() => OrderModule),
        MenuItemsModule,
        TypeOrmModule.forFeature([OrderItem])
    ],
    controllers: [OrderItemController],
    providers: [OrderItemService],
    exports: [OrderItemService],
})
export class OrderItemModule {}
