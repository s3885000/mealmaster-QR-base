import { Global, Module } from '@nestjs/common';
import { AnonymousService } from '../users/anonymous/anonymous.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { GuestSession } from 'src/jwt/session/entity/guest-session.entity';
import { TokenService } from '../jwt/token/token.service';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionService } from 'src/jwt/session/session.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwtSecret'),
        signOptions: { expiresIn: configService.get<string>('auth.accessTokenExpiration') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, GuestSession])
  ],
  providers: [AnonymousService, UsersService,TokenService, AuthService,SessionService],
  controllers: [AuthController],
  exports: [JwtModule, AnonymousService, UsersService],
})
export class AuthModule {}

