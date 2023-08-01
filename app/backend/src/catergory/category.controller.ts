import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateCategoryRequestDto } from './dto/request/CreateCategoryRequestDto.dto';
import { Category } from './entity/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryResponseDto } from './dto/response/CreateCategoryResponseDto.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    //Get all categories
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    //Get category by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<Category> {
        const category = await this.categoryService.findOne(id);
        if(!category) {
            throw new NotFoundException('Category not found!');
        } else {
            return category;
        }
    }

    //Create category
    @Post('create')
    createCategory(@Body() createCategoryDto: CreateCategoryRequestDto): Promise <CreateCategoryResponseDto> {
        return this.categoryService.create(createCategoryDto);
    }

    //Update category
    @Put(':id')
    async update( @Param('id') id: number, @Body() category: Category): Promise<any> {
        return this.categoryService.update(id, category);
    }

    //Delete category
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