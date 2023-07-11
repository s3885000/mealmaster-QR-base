import { Body, Controller, Get, Param, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResAddressService } from './res_address.service';
import { ResAddress } from './entity/resAddress.entity';
import { CreateResAddressRequestDto } from './dto/request/CreateResAddressRequestDto.dto';
import { CreateResAddressResponseDto } from './dto/response/CreateResAddressResponseDto.dto';

@Controller('res_address')
export class ResAddressController {
    constructor(private readonly resAddressService: ResAddressService) {}

    @Get()
    findAll(): Promise<ResAddress[]> {
        return this.resAddressService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise <ResAddress> {
        return this.resAddressService.findOne(id);
    }

    @Post('create/:restaurantId')
    create(@Param('restaurantId') restaurantId: number, @Body() createResAddressDto: CreateResAddressRequestDto) {
      return this.resAddressService.create(createResAddressDto, restaurantId);
    }

    @Put('update/:restaurantId')
    @UsePipes(new ValidationPipe({ transform: true}))
    async update(@Param('restaurantId') restaurantId: number, @Body() createResAddressDto: CreateResAddressRequestDto) {
        return this.resAddressService.create(createResAddressDto, restaurantId);
      }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.resAddressService.delete(id);
    }

}
