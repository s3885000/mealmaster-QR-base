import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entity/cart.entity";
import { CreateCartResponseDto } from "./dto/response/CreateCartResponse.dto";
import { CreateCartRequestDto } from "./dto/request/CreateCartRequestDto.dto";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    async findOne(id: number): Promise<Cart> {
        return this.cartRepository.findOne({ where: {id} })
    }

    async create(createCartDto: CreateCartRequestDto, userId: number): Promise<CreateCartResponseDto> {
        const user = await this.userRepository.findOne({where: {id: userId}})
        const {user_id, status, pickup_type, selected_payment_method, total_price, total_item, note} = createCartDto;

        const cart = new Cart();
        cart.user_id = user_id;
        cart.status = status;
        cart.pickup_type = pickup_type;
        cart.selected_payment_method = selected_payment_method;
        cart.total_price = total_price;
        cart.total_item = total_item;
        cart.note = note;
        cart.user = user;

        const savedCart = await this.cartRepository.save(cart);

        return {
            id: savedCart.id,
            user_id: savedCart.user_id,
            status: savedCart.status,
            pickup_type: savedCart.pickup_type,
            selected_payment_method: savedCart.selected_payment_method,
            total_item: savedCart.total_item,
            total_price: savedCart.total_price,
            note: savedCart.note,
        }
    }

    async update(id: number, cart: Partial<Cart>): Promise<Cart> {
        await this.cartRepository.update(id, cart);
        return this.cartRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}