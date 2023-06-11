import { Global, Module } from '@nestjs/common';
import { AnonymousService } from './anonymous/anonymous.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../generate_key/SecretKey-constants';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AnonymousService],
  controllers: [AuthController],
  exports: [JwtModule, AnonymousService],
})
export class AuthModule {}

