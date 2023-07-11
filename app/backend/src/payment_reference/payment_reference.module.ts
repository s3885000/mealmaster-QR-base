import { Module } from '@nestjs/common';
import { PaymentRefController } from './payment_reference.controller';
import { PaymentRefService } from './payment_reference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentReference } from './entity/paymentReference.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentReference])],
    controllers: [PaymentRefController],
    providers: [PaymentRefService]
})
export class PaymentReferenceModule {}
