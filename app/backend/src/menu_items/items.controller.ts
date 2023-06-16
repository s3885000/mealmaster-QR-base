import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entity/item.entity';
import { CreateMenuItemDto } from './dto/CreateMenuItem.dto';

@Controller('item')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    //Get all items
    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    //Get item by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Item> {
        const item = await this.itemsService.findOne(id);
        if (!item) {
            throw new NotFoundException('Item not found!');
        } else {
            return item;
        }
    }

    //Create item
    @Post('create')
    // async create(@Body() item: Item): Promise<Item> {
    //     return this.itemsService.create(item);
    createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto){
        console.log(createMenuItemDto);
    }

    //Update item
    @Put(':id')
    async update (@Param('id') id: number, @Body() item: Item): Promise<any> {
        return this.itemsService.update(id, item);
    }

    //Delete item
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if item does not exist
        const item = await this.itemsService.findOne(id);
        if (!item) {
            throw new NotFoundException('Item does not exist!');
        }
        return this.itemsService.delete(id);
    }
}