import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MenuItem } from "./entity/menu_item.entity";
import { CreateMenuItemRequestDto } from "./dto/resquest/CreateMenuItemRequestDto.dto";
import { CreateMenuItemResponseDto } from "./dto/response/CreateMenuItemResponseDto.dto";
import { CategoryService } from "src/catergory/category.service";

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
        return this.itemRepository.findOne({ where: {id} })
    }

    async create(createMenuItemDto: CreateMenuItemRequestDto): Promise<CreateMenuItemResponseDto> {
        const {category_id, name, description, price, image, is_best_seller, status} = createMenuItemDto;

        const categoryExists = await this.categoryService.findOne(category_id);
        if (!categoryExists) {
            throw new NotFoundException('Category not found!')
        }
        const item = new MenuItem();
        item.category_id = category_id,
        item.name = name;
        item.description = description;
        item.price = price;
        item.image = image;
        item.is_best_seller = is_best_seller;
        item.status = status != undefined ? status : true;

        await this.itemRepository.save(item);

        const createMenyItemResponseDto: CreateMenuItemResponseDto = {
            id: item.id,
            category_id: item.category_id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            is_best_seller: item.is_best_seller,
            status: item.status,
        };

        return createMenyItemResponseDto;
    }

    async update(id: number, item: CreateMenuItemRequestDto): Promise<MenuItem> {
        const existingItem = await this.itemRepository.findOne({ where: { id }});
        if (!existingItem) {
          throw new NotFoundException('Item not found!');
        }
    
        const updatedItem = {
          ...existingItem,
          ...item,
        };
    
        await this.itemRepository.save(updatedItem);
        return updatedItem;
      }

    async delete(id: number): Promise<void> {
        await this.itemRepository.delete(id);
    }
}