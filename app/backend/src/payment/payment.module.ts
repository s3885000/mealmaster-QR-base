import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import { Order } from 'src/order/entity/order.entity';
import { User } from 'src/user/entity/user.entity';
import { PaymentReference } from 'src/payment_reference/entity/paymentReference.entity';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Order, User, PaymentReference]), StripeModule],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {}
