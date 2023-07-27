import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./entity/cartItem.entity";
import { Cart } from "src/cart/entity/cart.entity";
import { CreateCartItemResponseDto } from "./dto/response/CreateCartItemResponseDto.dto";
import { CreateCartItemRequestDto } from "./dto/request/CreateCartItemRequestDto.dto";

@Injectable()
export class CartItemService{
    constructor(
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    async findAll(): Promise<CartItem[]> {
        return this.cartItemRepository.find();
    }

    async findOne(id: number): Promise<CartItem> {
        return this.cartItemRepository.findOne({ where: {id} })
    }

    async create(createCartItemDto: CreateCartItemRequestDto, cartId: number): Promise<CreateCartItemResponseDto> {
        const cart = await this.cartRepository.findOne({where: {id: cartId}});
        const {cart_id, menu_item_id, quantity, note, price} = createCartItemDto;

        const cartItem = new CartItem();
        cartItem.cart_id = cart_id;
        cartItem.menu_item_id = menu_item_id;
        cartItem.quantity = quantity;
        cartItem.note = note;
        cartItem.price = price;
        cartItem.cart = cart;

        const savedCartItem = await this.cartItemRepository.save(cartItem);

        return {
            id: savedCartItem.id,
            cart_id: savedCartItem.cart_id,
            menu_item_id: savedCartItem.menu_item_id,
            quantity: savedCartItem.quantity,
            note: savedCartItem.note,
            price: savedCartItem.price,
        };
    }

    // async update(cartId: number, createCartItemDto: CreateCartItemRequestDto): Promise<CreateCartItemResponseDto> {
    //     const cart = await this.cartRepository.findOne({where: {id: cartId}});
        
    //     if (!cart) {
    //         throw new NotFoundException('Cart not found!');
    //     }

    //     let cartItem = cart.cartItem;

    //     if (cartItem) {
    //         // If the cart already has the item, update it
    //         cartItem = this.cartItemRepository.merge(cartItem, createCartItemDto)
    //     } else {
    //         // If not, create a new one
    //         cartItem = this.cartItemRepository.create({ ...createCartItemDto, cart });
    //     }
    
    //     const savedCartItem = await this.cartItemRepository.save(cartItem);
    
    //     return {
    //         id: savedCartItem.id,
    //         cart_id: savedCartItem.cart_id,
    //         menu_item_id: savedCartItem.menu_item_id,
    //         quantity: savedCartItem.quantity,
    //         note: savedCartItem.note,
    //         price: savedCartItem.price,
    //     };
    // }

    async delete(id: number): Promise<void> {
        await this.cartItemRepository.delete(id);
    }
}