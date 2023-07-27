import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateRestaurantResponseDto } from './dto/response/CreateRestaurantResponseDto.dto';
import { CreateRestaurantRequestDto } from './dto/request/CreateRestaurantRequestDto.dto';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('restaurant')
@UseGuards(AuthGuard, RolesGuard)
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    //Get all restaurants
    @Get()
    async findAll(): Promise<Restaurant[]> {
        return this.restaurantService.findAll();
    }

    //Get restaurant by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Restaurant> {
        const restaurant = await this.restaurantService.findOne(id);
        if(!restaurant) {
            throw new NotFoundException('Restaurant not found!');
        } else {
            return restaurant;
        }
    }

    //Create restaurant
    @Post('create')
    createRestaurant(@Body() createRestaurantDto: CreateRestaurantResponseDto) {
        console.log(createRestaurantDto);
        return this.restaurantService.create(createRestaurantDto);
    }

    //Update restaurant
    @Put(':id')
    async update( @Param('id') id: number, @Body() restaurant: Restaurant): Promise<any> {
        return this.restaurantService.update(id, restaurant);
    }

    //Delete restaurant
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