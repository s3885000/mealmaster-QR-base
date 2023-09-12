import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
import { Order } from "./entity/order.entity";
import { CreateOrderRequestDto } from "./dto/request/CreateOrderRequestDto.dto";
import { CreateOrderResponseDto } from "./dto/response/CreateOrderResqonseDto.dto";
import { User } from "src/user/entity/user.entity";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Tables } from "src/table/entity/table.entity";
import { UpdateOrderRequestDto } from "./dto/request/UpdateOrderRequestDto.dto";
import { OrderStatus, Status } from "src/order_status/entity/orderStatus.entity";
import { MenuItem } from "src/menu_items/entity/menu_item.entity";
import { OrdersGateway } from "src/webSocket/orders.gateway";
import { OrderWithLatestStatus } from "./dto/response/latestStatusDescription.dto";


@Injectable()
export class OrderService{
    private readonly logger = new Logger(OrderService.name);
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
        @InjectRepository(MenuItem)
        private menuItemRepository: Repository<MenuItem>,
        private readonly ordersGateway: OrdersGateway,
    ) {}

    async findAll(userId: number): Promise<Order[]> {
        return this.orderRepository.find({ where: { id: userId }, relations: ['restaurant', 'orderItems', 'orderItems.menuItem'] });
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id }, relations: ['restaurant', 'user', 'table', 'payment', 'orderItems', 'orderItems.menuItem'] });
    }

    async create(createOrderRequestDto: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
        const {restaurant_id, table_id, payment_id, user_id, total_price, pickup_type} = createOrderRequestDto;

        // Fetch the managed entities based on the provided IDs
        const managedUser = await this.userRepository.findOne({ where: { id: user_id }});
        if (!managedUser) throw new NotFoundException('User not found!');

        const managedRestaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id }});
        if (!managedRestaurant) throw new NotFoundException('Restaurant not found!');

        const managedTable = await this.tableRepository.findOne({ where: { id: table_id }});
        if (!managedTable) throw new NotFoundException('Table not found!');

        const managedPayment = await this.paymentRepository.findOne({ where: { id: payment_id }});
        if (!managedPayment) throw new NotFoundException('Payment method not found!');
                
        
        const order = new Order();
        const timestampPart = Date.now().toString(36).substr(-5);
        const randomPart = Math.random().toString(36).substr(2, 5);
        order.unique_id = `${timestampPart}-${randomPart}`;
        order.restaurant = managedRestaurant;
        order.table = managedTable;
        order.payment = managedPayment;
        order.user = managedUser;
        order.total_price = total_price;
        order.pickup_type = pickup_type;


        this.logger.debug(`Creating order with total price: ${order.total_price}`)
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
            created_at: savedOrder.create_at,
            updated_at: savedOrder.update_at,
            order_items: []
        };

        return createOrderResponseDto;
    }

    async update(id: number, updateOrderRequestDto: UpdateOrderRequestDto): Promise<Order> {
        
        const {restaurant_id, table_id, payment_id, user_id, total_price, pickup_type} = updateOrderRequestDto;


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

        return await this.orderRepository.save(orderToUpdate);
    }

    public orderToDto(order: Order): UpdateOrderRequestDto {
        return {
            restaurant_id: order.restaurant.id,
            table_id: order.table.id,
            payment_id: order.payment.id,
            user_id: order.user.id,
            total_price: order.total_price,
            pickup_type: order.pickup_type,
        }

    }
    

    async getOrderStatus(orderId: number): Promise<OrderStatus> {
        const order = await this.orderRepository.findOne({ where: { id: orderId }, relations: ['orderStatus']});
        if (!order) {
            throw new NotFoundException('Order not found!');
        }
        const orderStatuses = order.orderStatus.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        return orderStatuses[0];  // Return the most recent status
    }

    async findAllOngoingOrders(userId: number): Promise<Order[]> {
        this.logger.log(`Fetching all ongoing orders for user ID: ${userId}`);
        const excludedStatuses = [Status.ORDER_COMPLETED, Status.ORDER_CANCELLED];
        
        const ongoingOrders: OrderWithLatestStatus[] = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.restaurant', 'restaurant')
            .leftJoinAndSelect('order.orderItems', 'orderItems')
            .leftJoinAndSelect('orderItems.menuItem', 'menuItem')
            .leftJoinAndSelect('order.orderStatus', 'orderStatus')
            .where('order.userId = :userId', { userId })
            .andWhere(qb => {
                const subQuery = qb.subQuery()
                    .select('status.status')
                    .from(OrderStatus, 'status')
                    .where('status.orderId = order.id')
                    .orderBy('status.timestamp', 'DESC')
                    .limit(1)
                    .getQuery();
                return `(${subQuery}) NOT IN (:...statuses)`;
            }, { statuses: excludedStatuses })
            .getMany();
        
        this.logger.log(`Found ${ongoingOrders.length} ongoing orders for user ID: ${userId}`);
    
        // Manually fetch images for each menu item
        for (const order of ongoingOrders) {
            for (const orderItem of order.orderItems) {
                const images = await this.menuItemRepository.createQueryBuilder('menuItem')
                    .relation(MenuItem, 'images')
                    .of(orderItem.menuItem.id)
                    .loadMany();
                orderItem.menuItem.images = images;
            }
        }
    
        // Create a map to store the latest order status for each order
        const latestStatusMap: Map<number, OrderStatus> = new Map();
    
        // Use the getOrderStatus method to fetch the latest order status for each order
        for (const order of ongoingOrders) {
            const latestStatus = await this.getOrderStatus(order.id);
            order.latestStatusDescription = latestStatus.status as Status;
            console.log(`For order ID: ${order.id}, emitting status: ${latestStatus.status}`);
            this.ordersGateway.updateOrderStatus(userId.toString(), order.id.toString(), latestStatus.status);
            console.log(`Emitting orderStatusUpdate for order ID: ${order.id}`);
            latestStatusMap.set(order.id, latestStatus);
        }        
    
        return ongoingOrders;
    }
    

    async findAllCompletedOrders(userId: number): Promise<Order[]> {
        // Fetch orders with a basic filter (with status of ORDER_COMPLETED)
        const completedOrders = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.restaurant', 'restaurant')
            .leftJoinAndSelect('order.orderItems', 'orderItems')
            .leftJoinAndSelect('orderItems.menuItem', 'menuItem')
            .leftJoinAndSelect('order.orderStatus', 'orderStatus')
            .where('order.userId = :userId', { userId })
            .andWhere('orderStatus.status = :completedStatus', { completedStatus: Status.ORDER_COMPLETED })
            .getMany();
    
        // Fetch images for each menu item
        for (const order of completedOrders) {
            for (const orderItem of order.orderItems) {
                const images = await this.menuItemRepository.createQueryBuilder('menuItem')
                    .relation(MenuItem, 'images')
                    .of(orderItem.menuItem.id)
                    .loadMany();
                orderItem.menuItem.images = images;
            }
        }
    
        return completedOrders;
    }
    
    
    async delete(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }
}