import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './user.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StripeModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],

})
export class UsersModule {}
