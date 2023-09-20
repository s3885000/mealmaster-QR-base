import { Injectable, Logger, NotFoundException } from "@nestjs/common";
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
import { CartService } from "src/cart/cart.service";


@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private stripeService: StripeService,
        private readonly cartService: CartService,

    ) {}

    async findAll(): Promise<Payment[]> {
        return this.paymentRepository.find();
    }

    async findOne(id: number): Promise<Payment> {
        return this.paymentRepository.findOne({ where: { id } })
    }

    async create(createPaymentDto: CreatePaymenRequestDto): Promise<PaymentResponseDto> {
        const { order_id, user_id, payment_id, payment_method, payment_status, payment_amount } = createPaymentDto;

        
        const order = await this.orderRepository.findOne({ where: { id: order_id }});
        if (!order) throw new NotFoundException('Order not found!');

        const user = await this.userRepository.findOne({ where: { id: user_id }});
        if (!user) throw new NotFoundException('User not found!');
        
        const payment = new Payment();
        payment.order = order;
        payment.user = user;
        payment.payment_id = payment_id;
        payment.payment_method = payment_method;
        payment.payment_status = payment_status;
        payment.payment_amount = payment_amount;
        
        const savedPayment = await this.paymentRepository.save(payment);


        const PaymentResponseDto: PaymentResponseDto = {
            id: savedPayment.id,
            order_id: savedPayment.order.id,
            user_id: savedPayment.user.id,
            payment_id: savedPayment.payment_id,
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
            payment_id: savedPayment.payment_id,
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
                // Pass the guest_id to createStripeCustomer
                stripeCustomerId = await this.stripeService.createStripeCustomer(user.email, user.phone_number, user.guest_id);
                user.stripeCustomerId = stripeCustomerId;
                await this.userRepository.save(user);
            } catch (error) {
                throw new Error(`Failed to create Stripe customer: ${error.message}`);
            }
        }
        const addedCardId = await this.stripeService.addCardToStripeCustomer(stripeCustomerId, token);
    
        if (!user.defaultCardId) {
            await this.setDefaultCardForUser(userId, addedCardId);
            user.defaultCardId = addedCardId;
            await this.userRepository.save(user);
        }
    
        return addedCardId;
    }
    

    // list cards
    async listCardsForUser(userId: number): Promise<Stripe.PaymentMethod[]> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user || !user.stripeCustomerId) throw new NotFoundException('User not found or no cards saved');
        const cards = await this.stripeService.listSavedCards(user.stripeCustomerId);
        return cards.data;
    }

    // charge user
    async chargeUser(userId: number, amountInDongs: number, cardId?: string): Promise<Stripe.PaymentIntent> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user || !user.stripeCustomerId) throw new NotFoundException('User not found or no cards saved');
        
        let paymentMethodId = cardId || user.defaultCardId;

        if (!paymentMethodId) {
            throw new Error('No card provided and no default card found.');
        }
    
        // If no cardId is provided, try to use the default card
        if (!cardId) {
            const defaultPaymentMethod = await this.stripeService.retrieveDefaultPaymentMethodForCustomer(user.stripeCustomerId);
            paymentMethodId = defaultPaymentMethod?.id;
        }
    
        if (!paymentMethodId) {
            throw new Error('No card provided and no default card found.');
        }
    
        try {
            const paymentIntent = await this.stripeService.createPaymentIntent(user.stripeCustomerId, amountInDongs, 'vnd', paymentMethodId);
            
            // Retrieve charges associated with the PaymentIntent
            const charges = await this.stripeService.listChargesForPaymentIntent(paymentIntent.id);
            
            if (!charges.data || !charges.data.length) {
                throw new Error('No charges found for the payment intent');
            }

            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to create payment intent: ${error.message}`);
        }
    }

    // Set default card
    async setDefaultCardForUser(userId: number, paymentMethodId: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user || !user.stripeCustomerId) throw new NotFoundException('User not found or no cards saved');
        
        await this.stripeService.setDefaultPaymentMethodForCustomer(user.stripeCustomerId, paymentMethodId);
        user.defaultCardId = paymentMethodId;
        await this.userRepository.save(user);
    }  

    // Get default card
    async getDefaultCardForUser(userId: number): Promise<Stripe.PaymentMethod | null> {
        const user = await this.userRepository.findOne({ where: { id: userId }});
        if (!user || !user.stripeCustomerId) throw new NotFoundException('User not found or no Stripe customer ID found');
        
        return this.stripeService.retrieveDefaultPaymentMethodForCustomer(user.stripeCustomerId);
    }

    validatePayment(paymentIntent: Stripe.PaymentIntent, expectedAmount: number): boolean {
        // Here, you can add various checks like comparing the amount, checking payment status, etc.
        return paymentIntent.amount === expectedAmount && paymentIntent.status === 'succeeded';
    }

    async createPaymentRecordFromIntent(orderId: number, userId: number, paymentIntent: Stripe.PaymentIntent): Promise<PaymentResponseDto> {
        const createPaymentDto: CreatePaymenRequestDto = {
            order_id: orderId,
            user_id: userId,
            payment_id: paymentIntent.id,
            payment_method: 'stripe',
            payment_status: paymentIntent.status,
            payment_amount: paymentIntent.amount
            // ... add any other required fields ...
        };

        return this.create(createPaymentDto);
    }

    async chargeAndRecordUser(userId: number, amountInDongs: number, cardId?: string): Promise<Stripe.PaymentIntent> {
        this.logger.debug(`Attempting to charge user with ID: ${userId} and amount: ${amountInDongs}`);
        const paymentIntent = await this.chargeUser(userId, amountInDongs, cardId);
        
        // Validate the payment
        if (!this.validatePayment(paymentIntent, amountInDongs)) {
            this.logger.error(`Payment validation failed for user ID: ${userId} and paymentIntent ID: ${paymentIntent.id}`);
            throw new Error('Payment validation failed');
        }
        
        // If the payment is successful, create an order from the cart
        this.logger.debug(`Checking for a COMPLETED cart for user ID: ${userId}`);
        const cart = await this.cartService.getCompletedCartByUserId(userId);
        if (!cart) {
            this.logger.error(`No COMPLETED cart found for user ID: ${userId}`);
            throw new NotFoundException('No COMPLETED cart found for the user.');
        }
        
        // Mark the cart as completed before transforming it into an order
        this.logger.debug(`Marking cart with ID: ${cart.id} as COMPLETED`);
        await this.cartService.completeCart(cart.id);
        
        this.logger.debug(`Transforming cart with ID: ${cart.id} to an order`);
        const order = await this.cartService.transformCartToOrder(cart.id);
        
        // If the payment is successful, create a payment record in your database
        this.logger.debug(`Creating a payment record for user ID: ${userId} and order ID: ${order.id}`);
        const paymentRecordDto = await this.createPaymentRecordFromIntent(order.id, userId, paymentIntent);
    
        // Retrieve the actual Payment entity using the DTO's ID
        const paymentEntity = await this.paymentRepository.findOne({ where: { id: paymentRecordDto.id }});
        if (!paymentEntity) {
            this.logger.error(`Failed to retrieve the Payment entity with ID: ${paymentRecordDto.id}`);
            throw new Error('Failed to retrieve the Payment entity after creation');
        }
        
        // Assign the Payment entity to the Order
        order.payment = paymentEntity;
        this.logger.debug(`Assigning payment with ID: ${paymentEntity.id} to order with ID: ${order.id}`);
        
        await this.orderRepository.save(order);
        
        return paymentIntent;
    }
    
    
}