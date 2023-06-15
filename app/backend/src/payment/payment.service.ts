import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Payment } from "./entity/payment.entity";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) {}

    async findAll(): Promise<Payment[]> {
        return this.paymentRepository.find();
    }

    async findOne(id: number): Promise<Payment> {
        return this.paymentRepository.findOne({ where: {id} })
    }
}