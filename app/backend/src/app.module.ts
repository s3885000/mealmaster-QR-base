import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { configFactory } from 'config/configFactory';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { QrCodeModule } from './qr_code/qr_code.module';
import { OrderModule } from './order/order.module';
import { TableModule } from './table/table.module';
import { MenuItemsModule } from './menu_items/menu_items.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentModule } from './payment/payment.module';
import { OrderItemModule } from './order_item/order_item.module';
import { OrderStatusModule } from './order_status/order_status.module';
import { OrdersGateway } from './webSocket/orders.gateway';
import { OrdersModule } from './webSocket/orders.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: configFactory,
      inject: [ConfigService],
      
    }),
    PaymentModule,
    StripeModule,
    UsersModule,
    AuthModule,
    CartModule,
    TableModule,
    RestaurantModule,
    OrderModule,
    QrCodeModule,
    MenuItemsModule,
    CartItemModule,
    OrderItemModule,
    OrderStatusModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwtSecret'),
        signOptions: { expiresIn: configService.get<string>('auth.accessTokenExpiration') },
      }),
      inject: [ConfigService],
    }),
    StripeModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
