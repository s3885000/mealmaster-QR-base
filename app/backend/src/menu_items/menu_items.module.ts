import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entity/menu_item.entity';
import { MenuItemsController } from './menu_items.controller';
import { CategoryModule } from 'src/catergory/category.module';
import { Image } from './entity/image.entity';
import { TableModule } from 'src/table/table.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MenuItem, Image]),
        CategoryModule,
        TableModule
    ],
    controllers: [MenuItemsController],
    providers: [MenuItemsService],
    exports: [MenuItemsService],
})
export class MenuItemsModule {}
