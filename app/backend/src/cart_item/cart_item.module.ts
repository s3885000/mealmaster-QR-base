import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entity/cart_item.entity';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartModule } from 'src/cart/cart.module';

@Module({
    imports: [
        CartModule,
        TypeOrmModule.forFeature([CartItem])],
    providers: [CartItemService],
    controllers: [CartItemController],
    exports: [CartItemService],
})
export class CartItemModule {}
