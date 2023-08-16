import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entity/cart_item.entity';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartModule } from 'src/cart/cart.module';
import { MenuItemsModule } from 'src/menu_items/menu_items.module';
import { Cart } from 'src/cart/entity/cart.entity';

@Module({
    imports: [
        CartModule,
        MenuItemsModule,
        TypeOrmModule.forFeature([CartItem, Cart])],
    providers: [CartItemService],
    controllers: [CartItemController],
    exports: [CartItemService],
})
export class CartItemModule {}
