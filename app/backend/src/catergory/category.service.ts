import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CreateCategoryResponseDto } from "./dto/response/CreateCategoryResponseDto.dto";
import { CreateCategoryRequestDto } from "./dto/request/CreateCategoryRequestDto.dto";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: {id} })
    }

    async create(createCategoryDto: CreateCategoryRequestDto, restaurantId: number): Promise<CreateCategoryResponseDto> {
        const restaurant = await this.restaurantRepository.findOne({where: { id: restaurantId }});
        const { restaurant_id, name, description } = createCategoryDto;

        const category = new Category();
        category.restaurant_id = restaurant_id;
        category.name = name;
        category.description = description;
        category.restaurant = restaurant;

        const savedCategory = await this.categoryRepository.save(category);

        return {
            id: savedCategory.id,
            restaurant_id: savedCategory.restaurant_id,
            name: savedCategory.name,
            description: savedCategory.description,
        };
    }

    async update(id: number, category: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}