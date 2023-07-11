import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CreateCategoryRequestDto } from "./dto/request/CreateCategoryRequestDto.dto";
import { CreateCategoryResponseDto } from "./dto/response/CreateCategoryResponseDto.dto";
import { RestaurantService } from "src/restaurant/restaurant.service";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private readonly restaurantService: RestaurantService,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: {id} })
    }

    async create(createCategoryDto: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
        const {name, description, restaurant_id} = createCategoryDto;

        //Check if the restaurant exists
        const restaurant = await this.restaurantService.findOne(restaurant_id);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found!');
        }
        
        const category = new Category();
        category.restaurant_id = restaurant_id;
        category.name = name;
        category.description = description;

        await this.categoryRepository.save(category);

        const createCategoryResponseDto: CreateCategoryResponseDto = {
            id: category.id,
            name: category.name,
            description: category.description,
          };
      
          return createCategoryResponseDto;
    }

    async update(id: number, category: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}