import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entity/payment.entity";
import { CreatePaymenRequestDto } from "./dto/request/CreatePaymentRequestDto.dto";
import { PaymentResponseDto } from "./dto/response/PaymentResponseDto.dto";
import { UpdatePaymentRequestDto } from "./dto/request/UpdatePaymentRequestDto.dto";
import { Order } from "src/order/entity/order.entity";
import { User } from "src/user/entity/user.entity";
import { StripeService } from "src/stripe/stripe.service";
import Stripe from "stripe";
import { PaymentReference } from "src/payment_reference/entity/paymentReference.entity";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PaymentReference)
        private paymentRefRepository: Repository<PaymentReference>,
        private stripeService: StripeService
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

    // Stripe
    // add card for user
    async addCardForUser(userId: number, token: string): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user) throw new NotFoundException('User not found');
            
        let stripeCustomerId = user.stripeCustomerId;
        
        if (!stripeCustomerId) {
            try {
                stripeCustomerId = await this.stripeService.createStripeCustomer(user.email, user.phone_number);
                user.stripeCustomerId = stripeCustomerId;
                await this.userRepository.save(user);
            } catch (error) {
                throw new Error(`Failed to create Stripe customer: ${error.message}`);
            }
        }
        
        try {
            return await this.stripeService.addCardToStripeCustomer(stripeCustomerId, token);
        } catch (error) {
            throw new Error(`Failed to add card to Stripe customer: ${error.message}`);
        }
    }

    // list cards
    async listCardsForUser(userId: number): Promise<Stripe.PaymentMethod[]> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user || !user.stripeCustomerId) throw new NotFoundException('User not found or no cards saved');
        const cards = await this.stripeService.listSavedCards(user.stripeCustomerId);
        return cards.data;
    }

    // charge user
    async chargeUser(userId: number, amountInDongs: number): Promise<Stripe.PaymentIntent> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user || !user.stripeCustomerId) throw new NotFoundException('User not found or no cards saved');
        
        try {
            const paymentIntent = await this.stripeService.createPaymentIntent(user.stripeCustomerId, amountInDongs);
    
            // Retrieve charges associated with the PaymentIntent
            const charges = await this.stripeService.listChargesForPaymentIntent(paymentIntent.id);
    
            if (!charges.data || !charges.data.length) {
                throw new Error('No charges found for the payment intent');
            }
            
            const paymentMethodId = charges.data[0].payment_method;
    
            // Save the paymentMethodId to your PaymentReference DB
            const paymentRef = new PaymentReference();
            paymentRef.user = user;  // Assigning the User entity here
            paymentRef.payment_ref = paymentMethodId; // Assuming this is the field where you store the card reference
            // Add any other required fields for PaymentReference here
    
            await this.paymentRefRepository.save(paymentRef);
    
            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to create payment intent: ${error.message}`);
        }
    }
    
}