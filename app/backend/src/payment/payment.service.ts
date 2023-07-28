import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entity/payment.entity";
import { CreatePaymenRequestDto } from "./dto/request/CreatePaymentRequestDto.dto";
import { PaymentResponseDto } from "./dto/response/PaymentResponseDto.dto";
import { UpdatePaymentRequestDto } from "./dto/request/UpdatePaymentRequestDto.dto";
import { Order } from "src/order/entity/order.entity";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<Payment[]> {
        return this.paymentRepository.find();
    }

    async findOne(id: number): Promise<Payment> {
        return this.paymentRepository.findOne({ where: { id } })
    }

    async create(createPaymentDto: CreatePaymenRequestDto): Promise<PaymentResponseDto> {
        const { order_id, user_id, payment_ref_id, payment_method, payment_status, payment_amount } = createPaymentDto;

        
        const order = await this.orderRepository.findOne({ where: { id: order_id }});
        if (!order) throw new NotFoundException('Order not found!');

        const user = await this.userRepository.findOne({ where: { id: user_id }});
        if (!user) throw new NotFoundException('User not found!');
        
        const payment = new Payment();
        payment.order = order;
        payment.user = user;
        payment.payment_ref_id = payment_ref_id;
        payment.payment_method = payment_method;
        payment.payment_status = payment_status;
        payment.payment_amount = payment_amount;
        
        const savedPayment = await this.paymentRepository.save(payment);


        const PaymentResponseDto: PaymentResponseDto = {
            id: savedPayment.id,
            order_id: savedPayment.order.id,
            user_id: savedPayment.user.id,
            payment_ref_id: savedPayment.payment_ref_id,
            payment_method: savedPayment.payment_method,
            payment_status: savedPayment.payment_status,
            payment_amount: savedPayment.payment_amount,
            create_at: savedPayment.created_at,
            update_at: savedPayment.updated_at,

        }

        return PaymentResponseDto;

    }

    async update(id: number, updatePaymentDto: UpdatePaymentRequestDto): Promise<PaymentResponseDto> {
        const payment = await this.paymentRepository.findOne({ where: { id }});
        if (!payment) {
            throw new Error('Payment not found!');
        }
        
        const updatedPayment = this.paymentRepository.merge(payment, updatePaymentDto);

        const savedPayment = await this.paymentRepository.save(updatedPayment);
        
        const PaymentResponseDto: PaymentResponseDto = {
            id: savedPayment.id,
            order_id: savedPayment.order.id,
            user_id: savedPayment.user.id,
            payment_ref_id: savedPayment.payment_ref_id,
            payment_method: savedPayment.payment_method,
            payment_status: savedPayment.payment_status,
            payment_amount: savedPayment.payment_amount,
            create_at: savedPayment.created_at,
            update_at: savedPayment.updated_at,

        }

        return PaymentResponseDto;

    }
}