import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entity/item.entity';
import { CreateMenuItemResponseDto } from './dto/response/CreateMenuItemResponseDto.dto';
import { CreateMenuItemRequestDto } from './dto/request/CreateMenuItemRequestDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('item')
@UseGuards(AuthGuard, RolesGuard)
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    //Get all items
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    //Get item by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
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
    @Roles(UserRole.RESTAURANT_OWNER)
    @Post('create')
    createMenuItem(@Body() createMenuItemDto: CreateMenuItemResponseDto){
        console.log(createMenuItemDto);
        return this.itemsService.create(createMenuItemDto);
    }

    //Update item
    @Roles(UserRole.RESTAURANT_OWNER)
    @Put(':id')
    async update (@Param('id') id: number, @Body() item: Item): Promise<any> {
        return this.itemsService.update(id, item);
    }

    //Delete item
    @Roles(UserRole.RESTAURANT_OWNER)
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