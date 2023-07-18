import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./entity/orderItem.entity";
import { CreateOrderItemRequestDto } from "./dto/request/CreateOrderItemRequestDto.dto";
import { CreateOrderItemResponseDto } from "./dto/response/CreateOrderItemResponseDto.dto";
import { MenuItemsService } from "src/menu_items/menu_items.service";

@Injectable()
export class OrderItemService{
    constructor(
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        private readonly menuItemsService: MenuItemsService,
    ) {}

    async findAll(): Promise<OrderItem[]> {
        return this.orderItemRepository.find();
    }

    async findOne(id: number): Promise<OrderItem> {
        return this.orderItemRepository.findOne({ where: {id} })
    }

    async create(
        createOrderItemDto: CreateOrderItemRequestDto,
      ): Promise<CreateOrderItemResponseDto> {
        const { menu_item_id } = createOrderItemDto;
    
        const menuItemExists = await this.menuItemsService.findOne(menu_item_id);
        if (!menuItemExists) {
          throw new NotFoundException('Menu item not found!');
        }
    
        const orderItem = new OrderItem();
        orderItem.order_id = createOrderItemDto.order_id;
        orderItem.menu_item_id = createOrderItemDto.menu_item_id;
        orderItem.quantity = createOrderItemDto.quantity;
        orderItem.note = createOrderItemDto.note;
        orderItem.price = createOrderItemDto.price;
    
        await this.orderItemRepository.save(orderItem);
    
        const createOrderItemResponseDto: CreateOrderItemResponseDto = {
          id: orderItem.id,
          order_id: orderItem.order_id,
          menu_item_id: orderItem.menu_item_id,
          quantity: orderItem.quantity,
          note: orderItem.note,
          price: orderItem.price,
        };
    
        return createOrderItemResponseDto;
      }
    async update(id: number, orderItem: Partial<OrderItem>): Promise<OrderItem> {
        await this.orderItemRepository.update(id, orderItem);
        return this.orderItemRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.orderItemRepository.delete(id);
    }
}