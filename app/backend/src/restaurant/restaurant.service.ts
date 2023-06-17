import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entity/restaurant.entity";
import { CreateRestaurantDto } from "./dto/CreateRestaurant.dto";

@Injectable()
export class RestaurantService{
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find();
    }

    async findOne(id: number): Promise<Restaurant> {
        return this.restaurantRepository.findOne({ where: {id} })
    }

    async create(createRestaurantDto: CreateRestaurantDto): Promise<string> {
        const {user_id, name, address_id, logo, res_banner} = createRestaurantDto;

        const restaurant = new Restaurant();
        restaurant.user_id = user_id;
        restaurant.name = name;
        restaurant.address_id = address_id;
        restaurant.logo = logo;
        restaurant.res_banner = res_banner;

        await this.restaurantRepository.save(restaurant);

        return 'Restaurant Added';
    }

    async update(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant> {
        await this.restaurantRepository.update(id, restaurant);
        return this.restaurantRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.restaurantRepository.delete(id);
    }
}
