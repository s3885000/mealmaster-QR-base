import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entity/cart.entity";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    async findOne(id: number): Promise<Cart> {
        return this.cartRepository.findOne({ where: {id} })
    }

    async update(id: number, cart: Partial<Cart>): Promise<Cart> {
        await this.cartRepository.update(id, cart);
        return this.cartRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}