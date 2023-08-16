import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart, CartStatus, PickupType } from "./entity/cart.entity";
import { CreateCartRequestDto } from "./dto/request/CreateCartRequestDto.dto";
import { CreateCartResponseDto } from "./dto/response/CreateCartResponseDto.sto";
import { UserService } from "src/user/user.service";
import { CartItem } from "src/cart_item/entity/cart_item.entity";


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        private readonly userService: UserService,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>
    ) {}

    async findOne(id: number): Promise<Cart> {
        const cart = this.cartRepository.findOne({ where: {id}, relations: ['cartItem'] });
        if(!cart) {
            throw new NotFoundException('Cart not found!')
        } else {
            return cart;
        }
    }

    async getOrCreateCartByUserId(userId: number): Promise<Cart> {
        let cart = await this.cartRepository.findOne({ where: { user: { id: userId } } });
        if (!cart) {
            cart = new Cart();
            cart.user = await this.userService.findUserById(userId);
            await this.cartRepository.save(cart);
        }
        return cart;
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
      
        // Save the updated cart
        await this.cartRepository.save(cart);
      }
      

    async create(createCartDto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
        const { user_id, pickup_type, total_price, total_item } = createCartDto;

        const userExists = await this.userService.findUserById(user_id);
        if(!userExists) {
            throw new NotFoundException('User not found!');
        }

        const cart = new Cart();
        cart.user = userExists;
        cart.status = CartStatus.ACTIVE;
        cart.pickup_type = pickup_type;
        cart.total_price = total_price;
        cart.total_item = total_item;
        
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
    
        if (pickupType === PickupType.SERVE_TO_TABLE) {
            cart.total_price += 5000;  // Add extra fee
        } else if (cart.total_price >= 5000) {  // Ensure it doesn't go negative
            cart.total_price -= 5000;  // Deduct fee if switching back to SELF_PICKUP
        }
    
        return await this.cartRepository.save(cart);
    }
    

    async update(id: number, cart: Partial<Cart>): Promise<Cart> {
        await this.cartRepository.update(id, cart);
        
        // Recalculate totals after update
        await this.recalculateCartTotals(id);
    
        return this.cartRepository.findOne({ where: { id } });
    }
    

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}