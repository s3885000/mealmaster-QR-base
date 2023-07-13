import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/CreateRestaurant.dto';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
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
    createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
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