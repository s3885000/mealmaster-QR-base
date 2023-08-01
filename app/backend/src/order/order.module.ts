import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { User } from 'src/user/entity/user.entity';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { Tables } from 'src/table/entity/table.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, User, Restaurant, Payment, Tables])],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
