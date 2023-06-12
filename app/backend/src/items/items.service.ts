import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./entity/item.entity";

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

    async create(item: Partial<Item>): Promise<Item> {
        const newitem = this.itemRepository.create(item);
        return this.itemRepository.save(newitem);
    }

    async update(id: number, item: Partial<Item>): Promise<Item> {
        await this.itemRepository.update(id, item);
        return this.itemRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.itemRepository.delete(id);
    }
}