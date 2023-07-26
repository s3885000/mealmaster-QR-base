import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./entity/orderItem.entity";
import { CreateOrderItemResponseDto } from "./dto/response/CreateOrderItemResponseDto.dto";

@Injectable()
export class OrderItemService{
    constructor(
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
    ) {}

    async findAll(): Promise<OrderItem[]> {
        return this.orderItemRepository.find();
    }

    async findOne(id: number): Promise<OrderItem> {
        return this.orderItemRepository.findOne({ where: {id} })
    }

    async create(createOrderItemDto: CreateOrderItemResponseDto): Promise<string> {
        const {order_id, menu_item_id, quantity, note, price} = createOrderItemDto;

        const orderItem = new OrderItem();
        orderItem.order_id = order_id;
        orderItem.menu_item_id = menu_item_id;
        orderItem.quantity = quantity;
        orderItem.note = note;
        orderItem.price = price;

        await this.orderItemRepository.save(orderItem);

        return 'Order Item Added';
    }

    async update(id: number, orderItem: Partial<OrderItem>): Promise<OrderItem> {
        await this.orderItemRepository.update(id, orderItem);
        return this.orderItemRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.orderItemRepository.delete(id);
    }
}