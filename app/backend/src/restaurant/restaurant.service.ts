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
        const {user_id, address_id, name, logo, banner, create_at, update_at} = createRestaurantDto;

        const restaurant = new Restaurant();
        restaurant.user_id = user_id;
        restaurant.address_id = address_id;
        restaurant.name = name;
        restaurant.logo = logo;
        restaurant.banner = banner;
        restaurant.create_at = create_at;
        restaurant.update_at = update_at;

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