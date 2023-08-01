import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Payment } from './entity/payment.entity';
import { PaymentService } from './payment.service';
import { CreatePaymenRequestDto } from './dto/request/CreatePaymentRequestDto.dto';
import { PaymentResponseDto } from './dto/response/PaymentResponseDto.dto';
import { UpdatePaymentRequestDto } from './dto/request/UpdatePaymentRequestDto.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    //Get all payments
    @Get()
    async findAll(): Promise<Payment[]> {
        return this.paymentService.findAll();
    }

    //Get payment by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<Payment> {
        const payment = await this.paymentService.findOne(id);
        if(!payment) {
            throw new NotFoundException('Payment not found!');
        } else {
            return payment;
        }
    }

    // Create a new payment
    @Post('create')
    async create(@Body() createPaymentDto: CreatePaymenRequestDto): Promise<PaymentResponseDto> {
        return this.paymentService.create(createPaymentDto);
    }

    //Update a payment
    @Put(':id')
    async update(@Param('id') id : number, @Body() updatePaymentDto: UpdatePaymentRequestDto): Promise<PaymentResponseDto> {
        return this.paymentService.update(id, updatePaymentDto);
    }

}