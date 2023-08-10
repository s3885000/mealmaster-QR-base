import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entity/restaurant.entity";
import { ResAddress } from "src/res_address/entity/resAddress.entity";
import { CreateResAddressRequestDto } from "src/res_address/dto/request/CreateResAddressRequestDto.dto";
import { CreateRestaurantResponseDto } from "./dto/response/CreateRestaurantResponseDto.dto";
import { CreateRestaurantRequestDto } from "./dto/request/CreateRestaurantRequestDto.dto";
import { GetRestaurantResponseDto } from "./dto/response/GetRestaurantResponseDto.dto";
import { User, UserRole } from "src/user/entity/user.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(ResAddress)
    private resAddressRepository: Repository<ResAddress>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantRequestDto, userId: number): Promise<CreateRestaurantResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId },  relations: ['restaurant'] });

    if (!user || user.role !== UserRole.RESTAURANT_OWNER) {
      throw new ForbiddenException('You must be a restaurant owner to create a restaurant.');
    }

    if (user.restaurant) {
      throw new BadRequestException('You already own a restaurant.');
    }

    const restaurant = new Restaurant();
    Object.assign(restaurant, createRestaurantDto);
    restaurant.owner = user;

    const savedRestaurant = await this.restaurantRepository.save(restaurant);
    return { user_id: userId, ...savedRestaurant };
  }

  async updateRestaurantAddress(restaurantId: number, createResAddressDto: CreateResAddressRequestDto): Promise<string> {
    // Find the restaurant
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId }, relations: ["address"] });
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

  async update(updateRestaurantDto: CreateRestaurantRequestDto, userId: number, restaurantId: number): Promise<Restaurant> {
    const user = await this.userRepository.findOne({ where: { id: userId }});
    if (!user || user.role !== UserRole.RESTAURANT_OWNER) {
      throw new ForbiddenException('You must be the owner to update this restaurant.');
    }

    const restaurant = await this.restaurantRepository.findOne({ where : { id: restaurantId }, relations: ['owner'] });
    if (restaurant.owner.id !== userId) {
      throw new ForbiddenException('You are not the owner of this restaurant.');
    }

    Object.assign(restaurant, updateRestaurantDto);
    await this.restaurantRepository.save(restaurant);

    return restaurant;
  }

  async delete(userId: number, restaurantId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }});
    if (!user || user.role !== UserRole.RESTAURANT_OWNER) {
      throw new ForbiddenException('You must be the owner to delete this restaurant.');
    }

    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId}, relations: ['owner'] });
    if (restaurant.owner.id !== userId) {
      throw new ForbiddenException('You are not the owner of this restaurant.');
    }

    await this.restaurantRepository.remove(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<GetRestaurantResponseDto> {
    let restaurant;
    try {
        restaurant = await this.restaurantRepository.findOne({ where: {id}, relations: ["address", "category", "category.items"] });
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
        categories: restaurant.category,
    }

    return response;
}

  async findEntityOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne({ where: { id }});
}
}


