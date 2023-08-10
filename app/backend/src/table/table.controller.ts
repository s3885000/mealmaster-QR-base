import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards, Patch } from '@nestjs/common';
import { CreateTableDto } from './dto/request/CreateTable.dto';
import { Tables } from './entity/table.entity';
import { TableService } from './table.service';
import { createTableResponseDto } from './dto/response/CreateTableResponseDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('table')
//@UseGuards(AuthGuard, RolesGuard)
export class TableController {
    constructor(private readonly tableService: TableService) {}

    //Get all tables
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Tables[]> {
        return this.tableService.findAll();
    }

    //Get table by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Tables> {
        const table = await this.tableService.findOne(id);
        if(!table) {
            throw new NotFoundException('Table not found!');
        } else {
            return table;
        }
    }

    //Create table
    @Roles(UserRole.RESTAURANT_OWNER)
    @Post('create')
    async createTable(@Body() createTableDto: CreateTableDto): Promise<createTableResponseDto> {
        return this.tableService.create(createTableDto);
    }

    //Update table
    @Roles(UserRole.RESTAURANT_OWNER)
    @Put(':id')
    async update( @Param('id') id: number, @Body() table: Tables): Promise<any> {
        return this.tableService.update(id, table);
    }
    

    //Delete table
    @Roles(UserRole.RESTAURANT_OWNER)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if table does not exist
        const table = await this.tableService.findOne(id);
        if (!table) {
            throw new NotFoundException('Table does not exist');
        }
        return this.tableService.delete(id);
    }
}