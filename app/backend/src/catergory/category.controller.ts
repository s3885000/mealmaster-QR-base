import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCategoryResponseDto } from './dto/response/CreateCategoryResponseDto.dto';
import { CreateCategoryRequestDto } from './dto/request/CreateCategoryRequestDto.dto';
import { Category } from './entity/category.entity';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('category')
@UseGuards(AuthGuard, RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    //Get all categories
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    //Get category by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Category> {
        const category = await this.categoryService.findOne(id);
        if(!category) {
            throw new NotFoundException('Category not found!');
        } else {
            return category;
        }
    }

    //Create category
    @Roles(UserRole.RESTAURANT_OWNER)
    @Post('create/:restaurantId')
    createCategory(@Param('restaurantId') restaurantId: number, @Body() createCategoryDto: CreateCategoryRequestDto) {
        console.log(createCategoryDto);
        return this.categoryService.create(createCategoryDto, restaurantId);
    }

    //Update category
    @Roles(UserRole.RESTAURANT_OWNER)
    @Put(':id')
    async update( @Param('id') id: number, @Body() category: Category): Promise<any> {
        return this.categoryService.update(id, category);
    }

    //Delete category
    @Roles(UserRole.RESTAURANT_OWNER)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if category does not exist
        const category = await this.categoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('Category does not exist');
        }
        return this.categoryService.delete(id);
    }
}