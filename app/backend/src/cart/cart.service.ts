import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entity/cart.entity";
import { CreateCartDto } from "./dto/CreateCart.dto";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    async findAll(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    async findOne(id: number): Promise<Cart> {
        return this.cartRepository.findOne({ where: {id} })
    }

    async create(createCartDto: CreateCartDto): Promise<string> {
        const {user_id, status, pickup_type, selected_payment_method, total_price, total_item, note} = createCartDto;

        const cart = new Cart();
        cart.user_id = user_id;
        cart.status = status;
        cart.pickup_type = pickup_type;
        cart.selected_payment_method = selected_payment_method;
        cart.total_price = total_price;
        cart.total_item = total_item;
        cart.note = note;

        await this.cartRepository.save(cart);

        return 'Category Added';
    }

    async update(id: number, cart: Partial<Cart>): Promise<Cart> {
        await this.cartRepository.update(id, cart);
        return this.cartRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}