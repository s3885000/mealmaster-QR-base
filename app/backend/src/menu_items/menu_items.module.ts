import { Module } from '@nestjs/common';
import { ItemsController } from './menu_items.controller';
import { MenuItemsService } from './menu_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entity/menu_item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MenuItem])],
    controllers: [ItemsController],
    providers: [MenuItemsService]
})
export class ItemsModule {}
