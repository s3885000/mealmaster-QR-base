import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entity/restaurant.entity";
import { ResAddress } from "src/res_address/entity/resAddress.entity";
import { ResAddressService } from "src/res_address/res_address.service";
import { CreateResAddressRequestDto } from "src/res_address/dto/request/CreateResAddressRequestDto.dto";
import { CreateRestaurantResponseDto } from "./dto/response/CreateRestaurantResponseDto.dto";
import { CreateRestaurantRequestDto } from "./dto/request/CreateRestaurantRequestDto.dto";
import { GetRestaurantResponseDto } from "./dto/response/GetRestaurantResponseDto.dto";

@Injectable()
export class RestaurantService{
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        private readonly resAddressService: ResAddressService,
        @InjectRepository(ResAddress)
        private readonly resAddressRepository: Repository<ResAddress>,
    ) {}

    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find();
    }

    async findOne(id: number): Promise<GetRestaurantResponseDto> {
        let restaurant;
        try {
            restaurant = await this.restaurantRepository.findOne({ where: {id}, relations: ["address"] });
        } catch (error) {
            console.error(error.message);
            throw new InternalServerErrorException('Failed to get the restaurant');
        }
    
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
        
        const response: GetRestaurantResponseDto = {
            id: restaurant.id,
            user_id: restaurant.user_id,
            address: restaurant.address.id,
            name: restaurant.name,
            logo: restaurant.logo,
            banner: restaurant.banner,
        }
    
        return response;
    }
    

    async create(createRestaurantDto: CreateRestaurantRequestDto): Promise<CreateRestaurantResponseDto> {
        const { user_id, name, logo, banner } = createRestaurantDto;

        const restaurant = new Restaurant();
        restaurant.user_id = user_id;
        restaurant.name = name;
        restaurant.logo = logo;
        restaurant.banner = banner;

        const savedRestaurant = await this.restaurantRepository.save(restaurant);


        return {
            id: savedRestaurant.id,
            user_id: savedRestaurant.user_id,
            name: savedRestaurant.name,
            logo: savedRestaurant.logo,
            banner: savedRestaurant.banner,
        };

    }

    async updateRestaurantAddress(restaurantId: number, createResAddressDto: CreateResAddressRequestDto): Promise<string> {
        // Find the restaurant
        const restaurant = await this.restaurantRepository.findOne({where: {id: restaurantId}, relations: ["address"]});
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
    
        // Check if restaurant already has an address, if not create a new one, if yes update it
        if (!restaurant.address) {
            const newAddress = new ResAddress();
            newAddress.number = createResAddressDto.number;
            newAddress.street = createResAddressDto.street;
            newAddress.city = createResAddressDto.city;
            newAddress.ward = createResAddressDto.ward;
            newAddress.restaurant = restaurant;

            await this.resAddressRepository.save(newAddress);
            restaurant.address = newAddress;
            
        } else {
            restaurant.address.number = createResAddressDto.number;
            restaurant.address.street = createResAddressDto.street;
            restaurant.address.city = createResAddressDto.city;
            restaurant.address.ward = createResAddressDto.ward;
            await this.resAddressRepository.save(restaurant.address);
        }
    
        await this.restaurantRepository.save(restaurant);
    
        return 'Restaurant address updated';
    }
    
    

    async update(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant> {
        await this.restaurantRepository.update(id, restaurant);
        return this.restaurantRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.restaurantRepository.delete(id);
    }
}
