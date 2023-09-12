import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { User } from 'src/user/entity/user.entity';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { Tables } from 'src/table/entity/table.entity';
import { CartModule } from 'src/cart/cart.module';
import { CartItemModule } from 'src/cart_item/cart_item.module';
import { OrderItemModule } from 'src/order_item/order_item.module';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderStatus } from 'src/order_status/entity/orderStatus.entity';
import { MenuItem } from 'src/menu_items/entity/menu_item.entity';
import { OrdersModule } from 'src/webSocket/orders.module';

@Module({
    imports: [
        CartModule,
        CartItemModule,
        PaymentModule,
        OrdersModule,
        forwardRef(() => OrderItemModule), 
        TypeOrmModule.forFeature([Order, User, Restaurant, Payment, Tables, OrderStatus, MenuItem])
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule {}
