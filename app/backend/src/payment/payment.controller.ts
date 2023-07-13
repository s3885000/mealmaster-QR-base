import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Payment } from './entity/payment.entity';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/CreatePayment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    //Get all payments
    @Get()
    async findAll(): Promise<Payment[]> {
        return this.paymentService.findAll();
    }

    //Get payment by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Payment> {
        const payment = await this.paymentService.findOne(id);
        if(!payment) {
            throw new NotFoundException('Payment not found!');
        } else {
            return payment;
        }
    }

    //Create payment
    @Post('create')
    createCategory(@Body() createPaymentDto: CreatePaymentDto) {
        console.log(createPaymentDto);
        return this.paymentService.create(createPaymentDto);
    }

    //Update payment
    @Put(':id')
    async update( @Param('id') id: number, @Body() payment: Payment): Promise<any> {
        return this.paymentService.update(id, payment);
    }

    //Delete payment
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if payment does not exist
        const payment = await this.paymentService.findOne(id);
        if (!payment) {
            throw new NotFoundException('Payment does not exist');
        }
        return this.paymentService.delete(id);
    }
}