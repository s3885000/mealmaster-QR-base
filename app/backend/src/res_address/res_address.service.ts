import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResAddress } from './entity/resAddress.entity';
import { CreateResAddressRequestDto } from './dto/request/CreateResAddressRequestDto.dto';
import { CreateResAddressResponseDto } from './dto/response/CreateResAddressResponseDto.dto';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';

@Injectable()
export class ResAddressService {
    constructor(
        @InjectRepository(ResAddress)
        private resAdressRepository: Repository<ResAddress>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    async findAll(): Promise<ResAddress[]> {
        return this.resAdressRepository.find();
    }

    async findOne(id: number): Promise<ResAddress> {
        return this.resAdressRepository.findOne({ where: { id }});
    }
    
    async create(createResAddressDto: CreateResAddressRequestDto, restaurantId: number): Promise<CreateResAddressResponseDto> {
        const restaurant = await this.restaurantRepository.findOne({where: { id: restaurantId }});
        const { number, street, city, ward } = createResAddressDto;

        const resAddress = new ResAddress();
        resAddress.number = number;
        resAddress.street = street;
        resAddress.city = city;
        resAddress.ward = ward;
        resAddress.restaurant = restaurant;

        const savedAddress = await this.resAdressRepository.save(resAddress);

        return {
            id: savedAddress.id,
            number: savedAddress.number,
            street: savedAddress.street,
            city: savedAddress.city,
            ward: savedAddress.ward,
        };
    }


    async update(restaurantId: number, createResAddressDto: CreateResAddressRequestDto): Promise<CreateResAddressResponseDto> {
        const restaurant = await this.restaurantRepository.findOne({where: { id: restaurantId}});
    
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
    
        let address = restaurant.address;
    
        if (address) {
            // If the restaurant already has an address, update it
            address = this.resAdressRepository.merge(address, createResAddressDto);
        } else {
            // If not, create a new one
            address = this.resAdressRepository.create({ ...createResAddressDto, restaurant });
        }
    
        const savedAddress = await this.resAdressRepository.save(address);
    
        return {
            id: savedAddress.id,
            number: savedAddress.number,
            street: savedAddress.street,
            city: savedAddress.city,
            ward: savedAddress.ward,
        };
    }
    

    async delete(id: number): Promise<void> {
        await this.resAdressRepository.delete(id);
    }
}
