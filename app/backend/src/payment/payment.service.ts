import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Payment } from "./entity/payment.entity";
import { CreatePaymentDto } from "./dto/CreatePayment.dto";

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

    async create(createPaymentDto: CreatePaymentDto): Promise<string> {
        const {order_id, user_id, payment_ref_is, payment_method, payment_status, payment_amount} = createPaymentDto;

        const payment = new Payment();
        payment.order_id = order_id;
        payment.user_id = user_id;
        payment.payment_ref_is = payment_ref_is;
        payment.payment_method = payment_method;
        payment.payment_status = payment_status;
        payment.payment_amount = payment_amount;

        await this.paymentRepository.save(payment);

        return 'Payment Added';
    }

    async update(id: number, payment: Partial<Payment>): Promise<Payment> {
        await this.paymentRepository.update(id, payment);
        return this.paymentRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.paymentRepository.delete(id);
    }
}