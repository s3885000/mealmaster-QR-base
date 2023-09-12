import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private readonly stripe: Stripe;

    constructor() {
        const stripeSecret = process.env.STRIPE_SECRET_KEY;
        this.stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' });
    }

    // Stripe 3rd party API
    // 1st create customer
    async createStripeCustomer(email?: string, phoneNumber?: string, guest_id?: string): Promise<string> {
        if (!email && !phoneNumber && !guest_id) {
            throw new Error('Either email, phone number, or guest_id must be provided.');
        }
    
        const customerData: Stripe.CustomerCreateParams = {};
    
        if (email) {
            customerData.email = email;
        } else if (phoneNumber) {
            customerData.description = `Customer with phone number: ${phoneNumber}`;
        } else if (guest_id) {
            customerData.description = `Guest user with ID: ${guest_id}`;
        }
    
        const customer = await this.stripe.customers.create(customerData);
        return customer.id;
    }
    

    // 2nd add card to stripe customer
    async addCardToStripeCustomer(stripeCustomerId: string, token: string): Promise<string> {
        //console.log('addCardToStripeCustomer called with stripeCustomerId:', stripeCustomerId, 'and token:', token);

        const paymentMethod = await this.stripe.paymentMethods.attach(token, { customer: stripeCustomerId });
        //console.log('Payment method attached with data:', paymentMethod);
        return paymentMethod.id;
    }



    //4th create payment intent
    async createPaymentIntent(stripeCustomerId: string, amountInDongs: number, currency: string = 'vnd', paymentMethodId?: string): Promise<Stripe.PaymentIntent> {
        const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
            amount: amountInDongs, // Amount in dongs for VND
            currency,  // Default is 'vnd'
            customer: stripeCustomerId,
            payment_method: paymentMethodId,
            confirmation_method: 'automatic',
            confirm: true,
        };
        return await this.stripe.paymentIntents.create(paymentIntentParams);
    }

    async listChargesForPaymentIntent(paymentIntentId: string): Promise<Stripe.ApiList<Stripe.Charge>> {
        return await this.stripe.charges.list({ payment_intent: paymentIntentId });
    }
    
    // List all saved card
    async listSavedCards(stripeCustomerId: string): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {
        return await this.stripe.paymentMethods.list ({
            customer: stripeCustomerId,
            type: 'card',
        });
    }

    // Set default card 
    async setDefaultPaymentMethodForCustomer(stripeCustomerId: string, paymentMethodId: string): Promise<void> {
        await this.stripe.customers.update(stripeCustomerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId
            }
        });
    }

    // 3rd retrieve card
    async retrieveDefaultPaymentMethodForCustomer(stripeCustomerId: string): Promise<Stripe.PaymentMethod | null> {
        const customer = await this.stripe.customers.retrieve(stripeCustomerId);
    
        // Type guard to ensure the customer object is of type Customer and not DeletedCustomer
        if ('invoice_settings' in customer) {
            const defaultPaymentMethodId = customer.invoice_settings.default_payment_method;
    
            if (defaultPaymentMethodId) {
                return await this.stripe.paymentMethods.retrieve(defaultPaymentMethodId as string);
            }
        }
        return null;
    }
}
