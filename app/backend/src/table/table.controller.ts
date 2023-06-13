import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/CreateTable.dto';
import { Table } from './entity/table.entity';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    //Get all tables
    @Get()
    async findAll(): Promise<Table[]> {
        return this.tableService.findAll();
    }

    //Get table by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<Table> {
        const table = await this.tableService.findOne(id);
        if(!table) {
            throw new NotFoundException('Table not found!');
        } else {
            return table;
        }
    }

    //Create table
    @Post('create')
    createTable(@Body() createTableDto: CreateTableDto) {
        console.log(createTableDto);
    }

    //Update table
    @Put(':id')
    async update( @Param('id') id: number, @Body() table: Table): Promise<any> {
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