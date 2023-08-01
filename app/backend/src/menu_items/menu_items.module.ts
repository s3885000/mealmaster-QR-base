import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entity/menu_item.entity';
import { MenuItemsController } from './menu_items.controller';
import { CategoryModule } from 'src/catergory/category.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MenuItem]),
        CategoryModule,
    ],
    controllers: [MenuItemsController],
    providers: [MenuItemsService],
    exports: [MenuItemsService],
})
export class MenuItemsModule {}
