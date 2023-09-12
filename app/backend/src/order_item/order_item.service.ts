import { Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./entity/orderItem.entity";
import { CreateOrderItemRequestDto } from "./dto/request/CreateOrderItemRequestDto.dto";
import { CreateOrderItemResponseDto } from "./dto/response/CreateOrderItemResponseDto.dto";
import { MenuItemsService } from "src/menu_items/menu_items.service";
import { OrderService } from "src/order/order.service";
import { Order } from "src/order/entity/order.entity";

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        private readonly menuItemsService: MenuItemsService,
        private readonly orderService: OrderService,
    ) {}

    async findAll(): Promise<OrderItem[]> {
        return this.orderItemRepository.find();
    }

    async findOne(id: number): Promise<OrderItem> {
        return this.orderItemRepository.findOne({ where: { id } });
    }

    async findItemsForOrder(orderId: number): Promise<OrderItem[]> {
        return this.orderItemRepository.find({ where: { order: { id: orderId } }, relations: ["menuItem", "order"] });
    }

    async create(createOrderItemDto: CreateOrderItemRequestDto, orderId: number): Promise<CreateOrderItemResponseDto> {
        const menuItemExists = await this.menuItemsService.findOne(createOrderItemDto.menu_item_id);
        if (!menuItemExists) {
            throw new NotFoundException('Menu item not found!');
        }

        const order = await this.orderService.findOne(orderId);
        if(!order) {
            throw new NotFoundException('Order not found!');
        }

        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.menuItem = menuItemExists;
        orderItem.quantity = createOrderItemDto.quantity;
        orderItem.note = createOrderItemDto.note;
        orderItem.price = menuItemExists.price * createOrderItemDto.quantity;

        await this.orderItemRepository.save(orderItem);

        const createOrderItemResponseDto: CreateOrderItemResponseDto = {
            id: orderItem.id,
            menu_item_id: orderItem.menuItem.id,
            quantity: orderItem.quantity,
            note: orderItem.note,
            price: orderItem.price,
            order_id: orderItem.order.id,
        };

        return createOrderItemResponseDto;
    }

    async update(id: number, updateOrderItemDto: Partial<OrderItem>): Promise<OrderItem> {
        const existingOrderItem = await this.orderItemRepository.findOne({ where: { id }, relations: ["order"] });
    
        if (!existingOrderItem) {
            throw new NotFoundException('Order item not found!');
        }

        if (updateOrderItemDto.menuItem) {
            const menuItemExists = await this.menuItemsService.findOne(updateOrderItemDto.menuItem.id);
            if (!menuItemExists) {
                throw new NotFoundException('Menu item not found!');
            }
            existingOrderItem.menuItem = menuItemExists;
            existingOrderItem.price = menuItemExists.price * (updateOrderItemDto.quantity || existingOrderItem.quantity);
        }

        if (updateOrderItemDto.quantity) {
            existingOrderItem.quantity = updateOrderItemDto.quantity;
            existingOrderItem.price = (existingOrderItem.menuItem.price || 0) * updateOrderItemDto.quantity;
        }

        if (updateOrderItemDto.note) {
            existingOrderItem.note = updateOrderItemDto.note;
        }

        await this.orderItemRepository.save(existingOrderItem);

        return existingOrderItem;
    }

    async delete(id: number): Promise<void> {
        const orderItem = await this.orderItemRepository.findOne({ where: { id }, relations: ["order"] });
        if (!orderItem) {
            throw new NotFoundException('Order item not found!');
        }

        await this.orderItemRepository.delete(id);
    }
}
