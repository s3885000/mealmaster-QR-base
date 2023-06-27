import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { CreateCategoryDto } from "./dto/CreateCategory.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: {id} })
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<string> {
        const {name, description, restaurant_id} = createCategoryDto;

        const category = new Category();
        category.restaurant_id = restaurant_id;
        category.name = name;
        category.description = description;

        await this.categoryRepository.save(category);

        return 'Category Added';
    }

    async update(id: number, category: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}