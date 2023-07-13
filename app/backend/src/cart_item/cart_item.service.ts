import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./entity/cartItem.entity";
import { CreateCartItemDto } from "./dto/CreateCartItem.dto";

@Injectable()
export class CartItemService{
    constructor(
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
    ) {}

    async findAll(): Promise<CartItem[]> {
        return this.cartItemRepository.find();
    }

    async findOne(id: number): Promise<CartItem> {
        return this.cartItemRepository.findOne({ where: {id} })
    }

    async create(createCartItemDto: CreateCartItemDto): Promise<string> {
        const {cart_id, menu_item_id, quantity, note, price} = createCartItemDto;

        const cartItem = new CartItem();
        cartItem.cart_id = cart_id;
        cartItem.menu_item_id = menu_item_id;
        cartItem.quantity = quantity;
        cartItem.note = note;
        cartItem.price = price;

        await this.cartItemRepository.save(cartItem);

        return 'Cart Item Added';
    }

    async update(id: number, cartItem: Partial<CartItem>): Promise<CartItem> {
        await this.cartItemRepository.update(id, cartItem);
        return this.cartItemRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.cartItemRepository.delete(id);
    }
}