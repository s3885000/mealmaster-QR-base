import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaymentReference } from "./entity/paymentReference.entity";
import { CreatePaymentRefResponseDto } from "./dto/response/CreatePaymentRefResponseDto.dto";

@Injectable()
export class PaymentRefService {
    constructor(
        @InjectRepository(PaymentReference)
        private paymentRefRepository: Repository<PaymentReference>,
    ) {}

    async findAll(): Promise<PaymentReference[]> {
        return this.paymentRefRepository.find();
    }

    async findOne(id: number): Promise<PaymentReference> {
        return this.paymentRefRepository.findOne({ where: {id} })
    }

    async create(createPaymentRefDto: CreatePaymentRefResponseDto): Promise<string> {
        const {cart_id, user_id, payment_ref, status} = createPaymentRefDto;

        const paymentRef = new PaymentReference();
        paymentRef.cart_id = cart_id;
        paymentRef.user_id = user_id;
        paymentRef.payment_ref = payment_ref;
        paymentRef.status = status;

        await this.paymentRefRepository.save(paymentRef);

        return 'Payment Reference Added';
    }

    async update(id: number, paymentReference: Partial<PaymentReference>): Promise<PaymentReference> {
        await this.paymentRefRepository.update(id, paymentReference);
        return this.paymentRefRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.paymentRefRepository.delete(id);
    }
}