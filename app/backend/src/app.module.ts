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


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: configFactory,
      inject: [ConfigService],
      
    }),
    UsersModule,
    AuthModule,
    CartModule,
    TableModule,
    RestaurantModule,
    OrderModule,
    QrCodeModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwtSecret'),
        signOptions: { expiresIn: configService.get<string>('auth.accessTokenExpiration') },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
