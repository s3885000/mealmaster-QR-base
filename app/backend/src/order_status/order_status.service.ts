import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderStatus } from "./entity/orderStatus.entity";
import { CreateOrderStatusResponseDto } from "./dto/response/CreateOrderStatusResponseDto.dto";

@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(OrderStatus)
        private orderStatusRepository: Repository<OrderStatus>,
    ) {}

    async findAll(): Promise<OrderStatus[]> {
        return this.orderStatusRepository.find();
    }

    async findOne(id: number): Promise<OrderStatus> {
        return this.orderStatusRepository.findOne({ where: {id} })
    }

    async create(createOrderStatusDto: CreateOrderStatusResponseDto): Promise<string> {
        const {order_id, status} = createOrderStatusDto;

        const orderStatus = new OrderStatus();
        orderStatus.order_id = order_id;
        orderStatus.status = status;

        await this.orderStatusRepository.save(orderStatus);

        return 'Order Status Added';
    }

    async update(id: number, orderStatus: Partial<OrderStatus>): Promise<OrderStatus> {
        await this.orderStatusRepository.update(id, orderStatus);
        return this.orderStatusRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.orderStatusRepository.delete(id);
    }
}