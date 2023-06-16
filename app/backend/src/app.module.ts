import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { configFactory } from 'config/configFactory';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from '@nestjs/config';
import { CartModule } from './cart/cart.module';

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
