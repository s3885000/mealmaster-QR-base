import { Module, forwardRef } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
        forwardRef(() => RestaurantModule),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
