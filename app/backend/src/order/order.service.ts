import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entity/order.entity";
import { CreateOrderRequestDto } from "./dto/request/CreateOrderRequestDto.dto";
import { CreateOrderResponseDto } from "./dto/response/CreateOrderResqonseDto.dto";
import { User } from "src/user/entity/user.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Tables } from "src/table/entity/table.entity";
import { UpdateOrderRequestDto } from "./dto/request/UpdateOrderRequestDto.dto";
import shortUUID from "short-uuid";


@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Tables)
        private tableRepository: Repository<Tables>,
    ) {}

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id } });
    }

    async create(createOrderRequestDto: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
        const {restaurant_id, table_id, payment_id, user_id, total_price, pickup_type, note} = createOrderRequestDto;

        const user = await this.userRepository.findOne({ where: { id: user_id }});
        if (!user) throw new NotFoundException('User not found!');

        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id }});
        if (!restaurant) throw new NotFoundException('Restaurant not found!');

        const payment = await this.paymentRepository.findOne({ where: { id: payment_id }});
        if (!payment) throw new NotFoundException('Payment method not found!');

        const table = await this.tableRepository.findOne({ where: { id: table_id }});
        if (!table) throw new NotFoundException('Table not found!');
        
        
        const order = new Order();
        order.unique_id = shortUUID.generate();
        order.restaurant = restaurant;
        order.table = table;
        order.payment = payment;
        order.user = user;
        order.total_price = total_price;
        order.pickup_type = pickup_type;
        order.note = note;

        const savedOrder = await this.orderRepository.save(order);

        const createOrderResponseDto: CreateOrderResponseDto = {
            id: savedOrder.id,
            unique_id: savedOrder.unique_id,
            restaurant: savedOrder.restaurant,
            table: savedOrder.table,
            payment: savedOrder.payment,
            user: savedOrder.user,
            total_price: savedOrder.total_price,
            pickup_type: savedOrder.pickup_type,
            note: savedOrder.note,
            created_at: savedOrder.create_at,
            updated_at: savedOrder.update_at,
            order_items: []
        };

        return createOrderResponseDto;
    }

    async update(id: number, updateOrderRequestDto: UpdateOrderRequestDto): Promise<Order> {
        
        const {restaurant_id, table_id, payment_id, user_id, total_price, pickup_type, note} = updateOrderRequestDto;


        const orderToUpdate = await this.orderRepository.findOne({ where: { id: id }, relations: ['restaurant', 'user', 'payment', 'table'] });
        if (!orderToUpdate) throw new NotFoundException('Order not found!');

        if (table_id) {
            const table = await this.tableRepository.findOne({ where: { id: table_id }});
            if (!table) throw new NotFoundException('Table not found!');
            orderToUpdate.table = table;
        }

        if (restaurant_id) {
            const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id }});
            if (!restaurant) throw new NotFoundException('Restaurant not found!');
            orderToUpdate.restaurant = restaurant;
        }

        if (user_id) {
            const user = await this.userRepository.findOne({ where: { id: user_id }});
            if (!user) throw new NotFoundException('User not found!');
            orderToUpdate.user = user;
        }

        if (payment_id) {
            const payment = await this.paymentRepository.findOne({ where: { id: payment_id }});
            if (!payment) throw new NotFoundException('Payment not found!');
            orderToUpdate.payment = payment;
        }

        orderToUpdate.total_price = total_price;
        orderToUpdate.pickup_type = pickup_type;
        orderToUpdate.note = note;

        return await this.orderRepository.save(orderToUpdate);
    }

    private orderToDto(order: Order): UpdateOrderRequestDto {
        return {
            restaurant_id: order.restaurant.id,
            table_id: order.table.id,
            payment_id: order.payment.id,
            user_id: order.user.id,
            total_price: order.total_price,
            pickup_type: order.pickup_type,
            note: order.note
        }

    }

    async delete(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }
}