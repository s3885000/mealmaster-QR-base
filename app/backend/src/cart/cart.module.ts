import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from 'src/cart_item/entity/cart_item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem])],
    providers: [CartService],
    exports: [CartService],
    controllers: [CartController],
})
export class CartModule {}
