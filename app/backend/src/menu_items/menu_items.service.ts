import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { MenuItem } from "./entity/menu_item.entity";
import { CreateMenuItemRequestDto } from "./dto/request/CreateMenuItemRequestDto.dto";
import { CreateMenuItemResponseDto } from "./dto/response/CreateMenuItemResponseDto.dto";
import { CategoryService } from "src/catergory/category.service";
import { Image } from "./entity/image.entity";
import { UpdateMenuItemRequestDto } from "./dto/request/UpdateMenuItemRequestDto.dto";
import { UpdateMenuItemResponseDto } from "./dto/response/UpdateMenuItemResponseDto.dto";
import { TableService } from "src/table/table.service";


@Injectable()
export class MenuItemsService {
    menuItemsService: any;
    constructor(
        @InjectRepository(MenuItem)
        private menuItemRepository: Repository<MenuItem>,
        private readonly categoryService: CategoryService,
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
        private readonly tableService: TableService
    ) {}

    async findAll(): Promise<MenuItem[]> {
        return this.menuItemRepository.find({ relations: ['images']});
    }

    async findOne(id: number): Promise<MenuItem> {
        const item = await this.menuItemRepository.findOne({ where: {id}, relations: ['category', 'images'] })
        if (!item) {
            throw new NotFoundException('Item not found');
        } else {
            return item;
        }
    }

    async findBestSellersByRestaurantAndTable(restaurantId: number, tableNo: number): Promise<MenuItem[]> {
        // First, validate the restaurant and table combination
        await this.tableService.findByRestaurantAndTableNumber(restaurantId, tableNo);
    
        // Fetch categories associated with Restaurant
        const categories = await this.categoryService.findByRestaurant(restaurantId);
    
        // Get category id
        const categoryIds = categories.map(category => category.id);
    
        // Find best sellers under those categories.
        return this.menuItemRepository.find({
            where: { is_best_seller: true, category: { id: In(categoryIds) } },
            relations: ['images']
        });
    }

    async getMenuItemPrice(menuItemId: number): Promise<number> {
        const menuItem = await this.menuItemsService.findOne(menuItemId);
        if (!menuItem) {
            throw new NotFoundException('Menu item not found!');
        }
        return menuItem.price;
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


        await this.menuItemRepository.save(item);

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
        const existingItem = await this.menuItemRepository.findOne({ where: { id }, relations: ['category']});
        if (!existingItem) {
          throw new NotFoundException(`Item with id ${id} not found!`);
        }

        console.log("Existing category ID:", existingItem.category.id);
    
        const {category_id, name, description, price, is_best_seller, status} = updateMenuItemDto;

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
    
        await this.menuItemRepository.save(existingItem);

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
        const result = await this.menuItemRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Item with id ${id} not found!`);
        }
    }
    
}