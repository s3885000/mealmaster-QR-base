import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entity/cart.entity";
import { CreateCartRequestDto } from "./dto/request/CreateCartRequestDto.dto";
import { CreateCartResponseDto } from "./dto/response/CreateCartResponseDto.sto";
import { UserService } from "src/user/user.service";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        private readonly userService: UserService,
    ) {}

    async findOne(id: number): Promise<Cart> {
        return this.cartRepository.findOne({ where: {id} })
    }

    async create(createCartDto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
        const { user_id, status, pickup_type, selected_payment_method, total_price, total_item, note } = createCartDto;

        const userExists = await this.userService.findUserById(user_id);
        if(!userExists) {
            throw new NotFoundException('User not found!');
        }

        const cart = new Cart();
        cart.user = userExists;
        cart.status = status;
        cart.pickup_type = pickup_type;
        cart.selected_payment_method = selected_payment_method;
        cart.total_price = total_price;
        cart.total_item = total_item;
        cart.note = note;
        
        await this.cartRepository.save(cart);

        const createCartResponseDto: CreateCartResponseDto = {
            id: cart.id,
            user: cart.user,
            status: cart.status,
            pickup_type: cart.pickup_type,
            selected_payment_method: cart.selected_payment_method,
            total_price: cart.total_price,
            total_item: cart.total_item,
            note: cart.note,
        };
        return createCartResponseDto;
    }

    async update(id: number, cart: Partial<Cart>): Promise<Cart> {
        await this.cartRepository.update(id, cart);
        return this.cartRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}