import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entity/order.entity";
import { CreateOrderRequestDto } from "./dto/request/CreateOrderRequestDto.dto";
import { CreateOrderResponseDto } from "./dto/response/CreateOrderResqonseDto.dto";

@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: {id} })
    }

    async create(createOrderRequestDto: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
        const {restaurant_id, table_id, payment_id, user_id, current_status, total_price, pickup_type, note} = createOrderRequestDto;

        const order = new Order();
        order.restaurant_id = restaurant_id;
        order.table_id = table_id;
        order.payment_id = payment_id;
        order.user_id = user_id;
        order.current_status = current_status;
        order.total_price = total_price;
        order.pickup_type = pickup_type;
        order.note = note;

        const savedOrder = await this.orderRepository.save(order);

        const createOrderResponseDto: CreateOrderResponseDto = {
            id: savedOrder.id,
            restaurant_id: savedOrder.restaurant_id,
            table_id: savedOrder.table_id,
            payment_id: savedOrder.payment_id,
            user_id: savedOrder.user_id,
            current_status: savedOrder.current_status,
            total_price: savedOrder.total_price,
            pickup_type: savedOrder.pickup_type,
            note: savedOrder.note,
            created_at: savedOrder.create_at,
            updated_at: savedOrder.update_at,
            order_items: []
        };

        return createOrderResponseDto;
    }

    async update(id: number, order: Partial<Order>): Promise<Order> {
        await this.orderRepository.update(id, order);
        return this.orderRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }
}