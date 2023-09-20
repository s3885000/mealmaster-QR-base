import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Cart, CartStatus, PickupType } from "./entity/cart.entity";
import { CreateCartRequestDto } from "./dto/request/CreateCartRequestDto.dto";
import { CreateCartResponseDto } from "./dto/response/CreateCartResponseDto.sto";
import { UserService } from "src/user/user.service";
import { CartItem } from "src/cart_item/entity/cart_item.entity";
import { Order } from "src/order/entity/order.entity";
import { OrderItem } from "src/order_item/entity/orderItem.entity";
import { MenuItem } from "src/menu_items/entity/menu_item.entity";
import { TableService } from "src/table/table.service";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { OrderStatus, Status } from "src/order_status/entity/orderStatus.entity";

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        private readonly userService: UserService,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(MenuItem)
        private menuItemRepository: Repository<MenuItem>,
        private readonly tableService: TableService,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(OrderStatus)
        private orderStatusRepository: Repository<OrderStatus>,
    ) {}

    async findOne(id: number): Promise<Cart> {
        const cart = this.cartRepository.findOne({ where: {id}, relations: ['cartItem'] });
        if(!cart) {
            throw new NotFoundException('Cart not found!')
        } else {
            return cart;
        }
    }

    async getOrCreateCartByUserId(userId: number, restaurantId: number, tableNo: number): Promise<Cart> {
        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId }});
        this.logger.debug(`Fetched restaurant with ID: ${restaurantId}, Details: ${JSON.stringify(restaurant)}`);

        const { table } = await this.tableService.findByRestaurantAndTableNumber(restaurantId, tableNo);
        this.logger.debug(`Fetched table with Number: ${tableNo} for restaurant ID: ${restaurantId}, Details: ${JSON.stringify(table)}`);

        let cart = await this.cartRepository.findOne({ where: { user: { id: userId }, status: CartStatus.ACTIVE } });
        
        if (!cart) {
            cart = new Cart();
            cart.user = await this.userService.findUserById(userId);
            cart.restaurant = restaurant;
            cart.table = table;
            this.logger.debug(`Set restaurant and table to cart. Cart Details: ${JSON.stringify(cart)}`);
            await this.cartRepository.save(cart);
            this.logger.debug(`Saved cart with details: ${JSON.stringify(cart)}`);
        }
        return cart;
    }

    async getCompletedCartByUserId(userId: number): Promise<Cart | null> {
        const cart = await this.cartRepository.findOne({ where: { user: { id: userId }, status: CartStatus.COMPLETED }, order: { update_at: "DESC" } });
        return cart || null;
    }

    async recalculateCartTotals(cartId: number): Promise<void> {
        const cart = await this.findOne(cartId);
        if (!cart) {
          throw new NotFoundException(`Cart with ID ${cartId} not found`);
        }
      
        // Fetch all items for the cart
        const cartItems = await this.cartItemRepository.find({ where: { cart: { id: cart.id } } });
    
        // Recalculate totals
        cart.total_price = cartItems.reduce((sum, item) => sum + item.price, 0);
        cart.total_item = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
        // Add the SERVE_TO_TABLE fee if the pickup_type is SERVE_TO_TABLE
        if (cart.pickup_type === PickupType.SERVE_TO_TABLE) {
            cart.total_price += 5000;  
        }
        this.logger.debug(`Recalculated total price for cart ID: ${cart.id}: ${cart.total_price} `)
    
        // Save the updated cart
        await this.cartRepository.save(cart);
    } 

    async create(createCartDto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
        const { user_id, pickup_type, total_price, total_item, restaurantId, tableNo } = createCartDto;

        const userExists = await this.userService.findUserById(user_id);
        if(!userExists) {
            throw new NotFoundException('User not found!');
        }

        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId }});
        const table = await this.tableService.findByRestaurantAndTableNumber(restaurantId, tableNo);

        const cart = new Cart();
        cart.user = userExists;
        cart.status = CartStatus.ACTIVE;
        cart.pickup_type = pickup_type;
        cart.total_price = total_price;
        cart.total_item = total_item;
        cart.restaurant = restaurant;
        cart.table = table;
        
        await this.cartRepository.save(cart);

        const createCartResponseDto: CreateCartResponseDto = {
            id: cart.id,
            user: cart.user,
            status: cart.status,
            pickup_type: cart.pickup_type,
            total_price: cart.total_price,
            total_item: cart.total_item,
        };
        return createCartResponseDto;
    }

    async updatePickupType(id: number, pickupType: PickupType): Promise<Cart> {
        const cart = await this.cartRepository.findOne({ where: { id }});
        if (!cart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }
        
        cart.pickup_type = pickupType;
        
        await this.recalculateCartTotals(id);  // Recalculate totals based on cart items
        
        if (pickupType === PickupType.SERVE_TO_TABLE) {
            cart.total_price += 5000;  // Add extra fee after recalculating totals
        } else if (cart.total_price >= 5000) {  // Ensure it doesn't go negative
            cart.total_price -= 5000;  // Deduct fee if switching back to SELF_PICKUP after recalculating totals
        }
        
        await this.cartRepository.save(cart);
        
        return cart;
    }
    
    async update(id: number, cart: Partial<Cart>): Promise<Cart> {
        await this.cartRepository.update(id, cart);
        
        // Recalculate totals after update
        await this.recalculateCartTotals(id);
    
        return this.cartRepository.findOne({ where: { id } });
    }

    async transformCartToOrder(cartId: number): Promise<Order> {
        try {
            this.logger.debug(`Transforming cart with ID: ${cartId} to order`);
        const cart = await this.cartRepository.findOne({ 
            where: { id: cartId }, 
            relations: ["user", "restaurant", "table", "cartItem", "cartItem.menuItem"] 
        });        
        
        if (!cart) {
            this.logger.error(`Cart with ID: ${cartId} not found`);
            throw new NotFoundException('Cart not found!');
        }
    
        const order = new Order();
        
        const timestampPart = Date.now().toString(36).substr(-5);
        const randomPart = Math.random().toString(36).substr(2, 5);
        order.unique_id = `${timestampPart}-${randomPart}`;
    
        order.user = cart.user;
        order.pickup_type = cart.pickup_type;
        order.restaurant = cart.restaurant;
        order.table = cart.table;
        order.user = cart.user;
        
    
        // Calculate total price first before saving
        let totalPrice = 0;
        for (const cartItem of cart.cartItem) {
            this.logger.debug(`Processing cartItem with ID: ${cartItem.id} for order`);
            const menuItemPrice = await this.getMenuItemPrice(cartItem.menuItem.id);
            totalPrice += menuItemPrice * cartItem.quantity;
        }
    
        // Add the SERVE_TO_TABLE fee if the pickup type is SERVE_TO_TABLE
        if (cart.pickup_type === PickupType.SERVE_TO_TABLE) {
            totalPrice += 5000;
        }
    
        order.total_price = totalPrice;
    
        const savedOrder = await this.orderRepository.save(order);

        // Set the default status to ORDER_PENDING_ACCEPTANCE
        const orderStatus = new OrderStatus();
        orderStatus.status = Status.ORDER_PENDING_ACCEPTANCE;
        orderStatus.order = savedOrder;
        orderStatus.timestamp = new Date();
        await this.orderStatusRepository.save(orderStatus);
    
        for (const cartItem of cart.cartItem) {
            this.logger.debug(`Processing cartItem with ID: ${cartItem.id} for order`);
            const orderItem = new OrderItem();
            orderItem.order = savedOrder;
            orderItem.menuItem = cartItem.menuItem;
            orderItem.quantity = cartItem.quantity;
            orderItem.note = cartItem.note;
            orderItem.price = await this.getMenuItemPrice(cartItem.menuItem.id) * cartItem.quantity;
            await this.orderItemRepository.save(orderItem);
        }
    
        // Clear the cart after the transformation
        await this.cartRepository.delete(cartId);
        this.logger.debug(`Cart with ID: ${cartId} deleted after transformation to order`);
        this.logger.debug(`Total price calculated for order from cart ID: ${cartId}: ${totalPrice}`);
        this.logger.debug(`Cart with ID: ${cartId} successfully transformed to order ID: ${savedOrder.id}`);
        return savedOrder;
        } catch (error) {
            this.logger.error(`Failed to transform cart with ID: ${cartId} to order. Error: ${error.message}`);
            throw new Error('Failed to transform cart to order. Please try again later.');
        }
        
    }
    
    async getMenuItemPrice(menuItemId: number): Promise<number> {
        const menuItem = await this.menuItemRepository.findOne({ where: { id: menuItemId }});
        if (!menuItem) {
            throw new NotFoundException(`MenuItem with ID ${menuItemId} not found`);
        }

        return menuItem.price;
    }


    async completeCart(cartId: number): Promise<void> {
        const cart = await this.cartRepository.findOne({ where: { id: cartId }});
        if (!cart) {
            this.logger.error(`Failed to find cart with ID: ${cartId} for completion`);
            throw new NotFoundException('Cart not found!');
        }
        cart.status = CartStatus.COMPLETED;
        await this.cartRepository.save(cart);
        this.logger.debug(`Cart with ID: ${cartId} marked as COMPLETED`);
    }
    

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}