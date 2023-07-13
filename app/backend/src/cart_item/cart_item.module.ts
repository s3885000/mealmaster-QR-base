import { Module } from '@nestjs/common';
import { CartItemController } from './cart_item.controller';
import { CartItemService } from './cart_item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entity/cartItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CartItem])],
    controllers: [CartItemController],
    providers: [CartItemService]
})
export class CartItemModule {}
