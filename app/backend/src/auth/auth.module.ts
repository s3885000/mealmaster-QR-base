import { Global, Module } from '@nestjs/common';
import { AnonymousService } from '../user/anonymous-user/anonymous.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { TokenService } from '../jwt/token/token.service';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


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
    TypeOrmModule.forFeature([User])
  ],
  providers: [AnonymousService, UserService,TokenService, AuthService],
  controllers: [AuthController],
  exports: [JwtModule, AnonymousService, UserService, TokenService],
})
export class AuthModule {}

