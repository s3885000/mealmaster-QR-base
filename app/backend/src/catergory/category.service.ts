import { ConflictException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
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
        @Inject(forwardRef(() => RestaurantService))
        private readonly restaurantService: RestaurantService,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: {id} })
    }

    async findAllByRestaurant(restaurantId: number): Promise<Category[]> {
        return this.categoryRepository.find({ where: { restaurant: { id: restaurantId }}});
    }

    async create(createCategoryDto: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
        const {name, description, restaurant_id} = createCategoryDto;

        // Check if the restaurant exists
        const restaurant = await this.restaurantService.findEntityOne(restaurant_id);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found!');
        }

        // Check if the category already exists
        const existingCategory = await this.categoryRepository.findOne({ where: { restaurant: { id: restaurant.id }, name: name }});
        if (existingCategory) {
            throw new ConflictException('Category already exists!');
        }
        
        const category = new Category();
        category.restaurant = restaurant;
        category.name = name;
        category.description = description;

        await this.categoryRepository.save(category);

        const createCategoryResponseDto: CreateCategoryResponseDto = {
            id: category.id,
            restaurant_id: restaurant.id,
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
