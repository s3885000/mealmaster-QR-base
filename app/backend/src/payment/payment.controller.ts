import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';
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

      // Stripe
    @Post(':userId/card')
    async addCard(@Param('userId', ParseIntPipe) userId: number, @Body('token') token: string): Promise<string> {
        return await this.paymentService.addCardForUser(userId, token);
    }
      

    @Get(':userId/cards')
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles(UserRole.CUSTOMER)
    async listCards(@Param('userId', ParseIntPipe) userId: number): Promise<any[]> {
        return await this.paymentService.listCardsForUser(userId);
    }

    @Post(':userId/charge')
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles(UserRole.CUSTOMER)
    async chargeUser(@Param('userId', ParseIntPipe) userId: number, @Body('amountInDongs') amountInDongs: number): Promise<any> {
        return await this.paymentService.chargeUser(userId, amountInDongs);
    }

}