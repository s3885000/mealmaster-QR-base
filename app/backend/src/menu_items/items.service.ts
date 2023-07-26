import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./entity/item.entity";
import { CreateMenuItemResponseDto } from "./dto/response/CreateMenuItemResponseDto.dto";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) {}

    async findAll(): Promise<Item[]> {
        return this.itemRepository.find();
    }

    async findOne(id: number): Promise<Item> {
        return this.itemRepository.findOne({ where: {id} })
    }

    async create(createMenuItemDto: CreateMenuItemResponseDto): Promise<string> {
        const {category_id, name, description, price, image, is_best_seller, status} = createMenuItemDto;

        const item = new Item();
        item.category_id = category_id
        item.name = name;
        item.description = description;
        item.price = price;
        item.image = image;
        item.is_best_seller = is_best_seller;
        item.status = status;

        await this.itemRepository.save(item);

        return 'Item Added';
    }

    async update(id: number, item: Partial<Item>): Promise<Item> {
        await this.itemRepository.update(id, item);
        return this.itemRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.itemRepository.delete(id);
    }
}