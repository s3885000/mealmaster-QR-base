import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { Session } from './entity/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],

})
export class UsersModule {}
