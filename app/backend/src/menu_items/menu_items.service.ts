import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MenuItem } from "./entity/menu_item.entity";
import { CreateMenuItemRequestDto } from "./dto/request/CreateMenuItemRequestDto.dto";
import { CreateMenuItemResponseDto } from "./dto/response/CreateMenuItemResponseDto.dto";
import { CategoryService } from "src/catergory/category.service";
import { Image } from "./entity/image.entity";
import { UpdateMenuItemRequestDto } from "./dto/request/UpdateMenuItemRequestDto.dto";
import { UpdateMenuItemResponseDto } from "./dto/response/UpdateMenuItemResponseDto.dto";


@Injectable()
export class MenuItemsService {
    constructor(
        @InjectRepository(MenuItem)
        private itemRepository: Repository<MenuItem>,
        private readonly categoryService: CategoryService,
        @InjectRepository(Image)
        private imageRepository: Repository<Image>
    ) {}

    async findAll(): Promise<MenuItem[]> {
        return this.itemRepository.find({ relations: ['images']});
    }

    async findOne(id: number): Promise<MenuItem> {
        const item = await this.itemRepository.findOne({ where: {id}, relations: ['category', 'images'] })
        if (!item) {
            throw new NotFoundException('Item not found');
        } else {
            return item;
        }
    }

    async create(createMenuItemDto: CreateMenuItemRequestDto): Promise<CreateMenuItemResponseDto> {
        const {category_id, name, description, price, is_best_seller, status} = createMenuItemDto;

        const category = await this.categoryService.findOne(category_id);
        if (!category) {
            throw new NotFoundException('Category not found!')
        }

        const imagesEntities = createMenuItemDto.images.map(image_url => {
            const image = new Image();
            image.image_url = image_url;
            return image;
        });
        
        await this.imageRepository.save(imagesEntities);

        const item = new MenuItem();
        item.category = category;
        item.name = name;
        item.description = description;
        item.price = price;
        item.images = imagesEntities;
        item.is_best_seller = is_best_seller;
        item.status = status != undefined ? status : true;


        await this.itemRepository.save(item);

        const createMenyItemResponseDto: CreateMenuItemResponseDto = {
            id: item.id,
            category: item.category,
            name: item.name,
            description: item.description,
            price: item.price,
            images: item.images.map(image => image.image_url),
            is_best_seller: item.is_best_seller,
            status: item.status,
        };

        return createMenyItemResponseDto;
    }

    async update(id: number, updateMenuItemDto: UpdateMenuItemRequestDto): Promise<UpdateMenuItemResponseDto> {
        const existingItem = await this.itemRepository.findOne({ where: { id }, relations: ['category']});
        if (!existingItem) {
          throw new NotFoundException(`Item with id ${id} not found!`);
        }

        console.log("Existing category ID:", existingItem.category.id);
    
        const {category_id, name, description, price, images, is_best_seller, status} = updateMenuItemDto;

        console.log("Category ID from request:", category_id);
        
        if (category_id !== undefined) {
            const category = await this.categoryService.findOne(category_id);
            if (!category) {
                throw new NotFoundException(`Category with id ${category_id} not found!`);
            }
            existingItem.category = category;
        }
        
        existingItem.name = name;
        existingItem.description = description;
        existingItem.price = price;
        existingItem.is_best_seller = is_best_seller;
        existingItem.status = status;

        // handle updating of images
        if (updateMenuItemDto.images) {

            await this.imageRepository.remove(existingItem.images);

            //Create new images
            existingItem.images = updateMenuItemDto.images.map(image_url => {
                const image = new Image();
                image.image_url = image_url;
                return image;
            });

            await this.imageRepository.save(existingItem.images);
        }
    
        await this.itemRepository.save(existingItem);

        const updatedMenuItemResponseDto : UpdateMenuItemResponseDto = {
            id: existingItem.id,
            category: existingItem.category,
            name: existingItem.name,
            description: existingItem.description,
            price: existingItem.price,
            is_best_seller: existingItem.is_best_seller,
            images: existingItem.images.map(image => image.image_url),
            status: existingItem.status
        }

        return updatedMenuItemResponseDto;
    }
    
    async delete(id: number): Promise<void> {
        const result = await this.itemRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Item with id ${id} not found!`);
        }
    }
    
}