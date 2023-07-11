import { Module } from '@nestjs/common';
import { ResAddressController } from './res_address.controller';
import { ResAddressService } from './res_address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResAddress } from './entity/resAddress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResAddress])],
  controllers: [ResAddressController],
  providers: [ResAddressService],
  exports: [ResAddressService]
})
export class ResAddressModule {}
