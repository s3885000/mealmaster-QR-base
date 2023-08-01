import { Body, Controller, Get, Param, Post, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ResAddressService } from './res_address.service';
import { ResAddress } from './entity/resAddress.entity';
import { CreateResAddressRequestDto } from './dto/request/CreateResAddressRequestDto.dto';
import { CreateResAddressResponseDto } from './dto/response/CreateResAddressResponseDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('res_address')
@UseGuards(AuthGuard, RolesGuard)
export class ResAddressController {
    constructor(private readonly resAddressService: ResAddressService) {}

    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    findAll(): Promise<ResAddress[]> {
        return this.resAddressService.findAll();
    }

    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    findOne(@Param('id') id: number): Promise <ResAddress> {
        return this.resAddressService.findOne(id);
    }

    @Roles(UserRole.RESTAURANT_OWNER)
    @Post('create/:restaurantId')
    create(@Param('restaurantId') restaurantId: number, @Body() createResAddressDto: CreateResAddressRequestDto) {
        return this.resAddressService.create(createResAddressDto, restaurantId);
    }

    @Roles(UserRole.RESTAURANT_OWNER)
    @Put('update/:restaurantId')
    @UsePipes(new ValidationPipe({ transform: true}))
    async update(@Param('restaurantId') restaurantId: number, @Body() createResAddressDto: CreateResAddressRequestDto) {
        return this.resAddressService.create(createResAddressDto, restaurantId);
    }

    @Roles(UserRole.RESTAURANT_OWNER)
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.resAddressService.delete(id);
    }

}
