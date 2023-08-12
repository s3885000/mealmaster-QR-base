import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';
import { MenuItem } from './entity/menu_item.entity';
import { CreateMenuItemRequestDto } from './dto/request/CreateMenuItemRequestDto.dto';
import { CreateMenuItemResponseDto } from './dto/response/CreateMenuItemResponseDto.dto';
import { UpdateMenuItemRequestDto } from './dto/request/UpdateMenuItemRequestDto.dto';
import { UpdateMenuItemResponseDto } from './dto/response/UpdateMenuItemResponseDto.dto';

@Controller('item')
export class MenuItemsController {
    constructor(private readonly menuItemsService: MenuItemsService) {}

    //Get all items
    @Get()
    async findAll(): Promise<MenuItem[]> {
        return this.menuItemsService.findAll();
    }

    //Get item by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<MenuItem> {
        const item = await this.menuItemsService.findOne(id);
        if (!item) {
            throw new NotFoundException('Item not found!');
        } else {
            return item;
        }
    }

    @Get('restaurant/:restaurantId/table/:tableNo/best-sellers')
    async findBestSellersByRestaurantAndTable(@Param('restaurantId') restaurantId: number, @Param('tableNo') tableNo: number): Promise<MenuItem[]> {
        return this.menuItemsService.findBestSellersByRestaurantAndTable(restaurantId, tableNo);
    }
    
    //Create item
    @Post('create')
    createMenuItem(@Body() createMenuItemDto: CreateMenuItemRequestDto): Promise<CreateMenuItemResponseDto> {
        return this.menuItemsService.create(createMenuItemDto);
    }

    // Update item
    @Put(':id')
    async update (@Param('id') id: number, @Body() item: UpdateMenuItemRequestDto): Promise<UpdateMenuItemResponseDto> {
        return this.menuItemsService.update(id, item);
    }

    //Delete item
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if item does not exist
        const item = await this.menuItemsService.findOne(id);
        if (!item) {
            throw new NotFoundException('Item does not exist!');
        }
        return this.menuItemsService.delete(id);
    }
}