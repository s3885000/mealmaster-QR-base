import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateRestaurantRequestDto } from './dto/request/CreateRestaurantRequestDto.dto';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { CreateResAddressRequestDto } from 'src/res_address/dto/request/CreateResAddressRequestDto.dto';
import { GetRestaurantResponseDto } from './dto/response/GetRestaurantResponseDto.dto';
import { CreateRestaurantResponseDto } from './dto/response/CreateRestaurantResponseDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserRole } from 'src/user/entity/user.entity';
import { Roles } from 'src/auth/guards/role.dectorator';

@Controller('restaurant')
@UseGuards(AuthGuard, RolesGuard)
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    //Get all restaurants
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Restaurant[]> {
        return this.restaurantService.findAll();
    }

    //Get restaurant by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<GetRestaurantResponseDto> {
        const restaurant = await this.restaurantService.findOne(id);
        if(!restaurant) {
            throw new NotFoundException('Restaurant not found!');
        } else {
            return restaurant;
        }
    }

    //Create restaurant
    @Roles(UserRole.RESTAURANT_OWNER)
    @Post('create')
    async create(@Body() createRestaurantDto: CreateRestaurantRequestDto): Promise<CreateRestaurantResponseDto> {
    return this.restaurantService.create(createRestaurantDto);
    }
    

    //Update restaurant
    @Roles(UserRole.RESTAURANT_OWNER)
    @Put(':id')
    async update( @Param('id') id: number, @Body() restaurant: Restaurant): Promise<any> {
        return this.restaurantService.update(id, restaurant);
    }

    @Roles(UserRole.RESTAURANT_OWNER)
    @Put(':id/address')
    async updateAddress(@Param('id') id: number, @Body() createResAddressDto: CreateResAddressRequestDto): Promise<any> {
        return this.restaurantService.updateRestaurantAddress(id, createResAddressDto);
    }

    //Delete restaurant
    @Roles(UserRole.RESTAURANT_OWNER)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if restaurant does not exist
        const restaurant = await this.restaurantService.findOne(id);
        if (!restaurant) {
            throw new NotFoundException('Restaurant does not exist');
        }
        return this.restaurantService.delete(id);
    }
}