import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MenuItem } from "./entity/menu_item.entity";
import { CreateMenuItemRequestDto } from "./dto/request/CreateMenuItemRequestDto.dto";
import { CreateMenuItemResponseDto } from "./dto/response/CreateMenuItemResponseDto.dto";
import { CategoryService } from "src/catergory/category.service";
import { Category } from "src/catergory/entity/category.entity";

@Injectable()
export class MenuItemsService {
    constructor(
        @InjectRepository(MenuItem)
        private itemRepository: Repository<MenuItem>,
        private readonly categoryService: CategoryService,
    ) {}

    async findAll(): Promise<MenuItem[]> {
        return this.itemRepository.find();
    }

    async findOne(id: number): Promise<MenuItem> {
        const item = await this.itemRepository.findOne({ where: {id}, relations: ['category'] })
        if (!item) {
            throw new NotFoundException('Item not found');
        } else {
            return item;
        }
    }

    async create(createMenuItemDto: CreateMenuItemRequestDto): Promise<CreateMenuItemResponseDto> {
        const {category_id, name, description, price, image, is_best_seller, status} = createMenuItemDto;

        const category = await this.categoryService.findOne(category_id);
        if (!category) {
            throw new NotFoundException('Category not found!')
        }
        const item = new MenuItem();
        item.category = category;
        item.name = name;
        item.description = description;
        item.price = price;
        item.image = image;
        item.is_best_seller = is_best_seller;
        item.status = status != undefined ? status : true;

        await this.itemRepository.save(item);

        const createMenyItemResponseDto: CreateMenuItemResponseDto = {
            id: item.id,
            category: item.category,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            is_best_seller: item.is_best_seller,
            status: item.status,
        };

        return createMenyItemResponseDto;
    }

    async update(id: number, updateMenuItemDto: CreateMenuItemRequestDto): Promise<MenuItem> {
        const existingItem = await this.itemRepository.findOne({ where: { id }, relations: ['category']});
        if (!existingItem) {
          throw new NotFoundException(`Item with id ${id} not found!`);
        }
    
        const {category_id, name, description, price, image, is_best_seller, status} = updateMenuItemDto;
    
        const category = await this.categoryService.findOne(category_id);
        if (!category) {
            throw new NotFoundException(`Category with id ${category_id} not found!`);
        }
    
        existingItem.category = category;
        existingItem.name = name;
        existingItem.description = description;
        existingItem.price = price;
        existingItem.image = image;
        existingItem.is_best_seller = is_best_seller;
        existingItem.status = status;
    
        await this.itemRepository.save(existingItem);
        return existingItem;
    }
    
    async delete(id: number): Promise<void> {
        const result = await this.itemRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Item with id ${id} not found!`);
        }
    }
    
}