import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entity/order.entity";
import { CreateOrderDto } from "./dto/CreateOrder.dto";

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

    async create(createOrderDto: CreateOrderDto): Promise<string> {
        const {restaurant_id, table_id, payment_id, user_id, current_status, total_price, pickup_type, create_at, update_at, note} = createOrderDto;

        const order = new Order();
        order.restaurant_id = restaurant_id;
        order.table_id = table_id;
        order.payment_id = payment_id;
        order.user_id = user_id;
        order.current_status = current_status;
        order.total_price = total_price;
        order.pickup_type = pickup_type;
        order.create_at = create_at;
        order.update_at = update_at;
        order.note = note;

        await this.orderRepository.save(order);

        return 'Order Added';
    }

    async update(id: number, order: Partial<Order>): Promise<Order> {
        await this.orderRepository.update(id, order);
        return this.orderRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }
}