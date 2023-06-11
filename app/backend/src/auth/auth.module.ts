import { Global, Module } from '@nestjs/common';
import { AnonymousService } from './anonymous/anonymous.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../generate_key/SecretKey-constants';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Session } from 'src/users/entity/session.entity';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([User, Session])
  ],
  providers: [AnonymousService, UsersService],
  controllers: [AuthController],
  exports: [JwtModule, AnonymousService, UsersService],
})
export class AuthModule {}

