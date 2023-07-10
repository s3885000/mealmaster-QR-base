import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/request/CreateTable.dto';
import { Tables } from './entity/table.entity';
import { TableService } from './table.service';
import { createTableResponseDto } from './dto/response/CreateTableResponseDto.dto';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    //Get all tables
    @Get()
    async findAll(): Promise<Tables[]> {
        return this.tableService.findAll();
    }

    //Get table by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<Tables> {
        const table = await this.tableService.findOne(id);
        if(!table) {
            throw new NotFoundException('Table not found!');
        } else {
            return table;
        }
    }

    //Create table
    @Post('create')
    async createTable(@Body() createTableDto: CreateTableDto): Promise<createTableResponseDto> {
        return this.tableService.create(createTableDto);
    }

    //Update table
    @Put(':id')
    async update( @Param('id') id: number, @Body() table: Tables): Promise<any> {
        return this.tableService.update(id, table);
    }

    //Delete table
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