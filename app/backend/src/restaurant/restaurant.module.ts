import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { ResAddress } from 'src/res_address/entity/resAddress.entity';
import { ResAddressService } from 'src/res_address/res_address.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant, ResAddress])],
    controllers: [RestaurantController],
    providers: [RestaurantService, ResAddressService]
})
export class RestaurantModule {}
