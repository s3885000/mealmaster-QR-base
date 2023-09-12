import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from 'src/cart_item/entity/cart_item.entity';
import { Order } from 'src/order/entity/order.entity';
import { OrderItem } from 'src/order_item/entity/orderItem.entity';
import { MenuItem } from 'src/menu_items/entity/menu_item.entity';
import { TableModule } from 'src/table/table.module';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { OrderStatus } from 'src/order_status/entity/orderStatus.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem, Order, OrderItem, MenuItem, Restaurant, OrderStatus]), TableModule],
    providers: [CartService],
    exports: [CartService],
    controllers: [CartController],
})
export class CartModule {}
