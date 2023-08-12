import { Module, forwardRef } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { ResAddress } from 'src/res_address/entity/resAddress.entity';
import { ResAddressService } from 'src/res_address/res_address.service';
import { TableModule } from 'src/table/table.module';
import { CategoryModule } from 'src/catergory/category.module';
import { User } from 'src/user/entity/user.entity';
import { MenuItemsModule } from 'src/menu_items/menu_items.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant, ResAddress, User]),
        TableModule,
        CategoryModule,
        MenuItemsModule
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService, ResAddressService],
    exports: [RestaurantService],
})
export class RestaurantModule {}
