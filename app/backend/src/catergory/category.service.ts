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

    async findOne(category_id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: {category_id} })
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<string> {
        const {name, description} = createCategoryDto;

        const category = new Category();
        category.name = name;
        category.description = description;

        await this.categoryRepository.save(category);

        return 'Category Added';
    }

    async update(category_id: number, category: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(category_id, category);
        return this.categoryRepository.findOne({ where: { category_id } });
    }

    async delete(category_id: number): Promise<void> {
        await this.categoryRepository.delete(category_id);
    }
}