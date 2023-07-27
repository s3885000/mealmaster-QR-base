import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { Payment } from './entity/payment.entity';
import { PaymentService } from './payment.service';
import { CreatePaymentResponseDto } from './dto/response/CreatePaymentResponseDto.dto';
import { CreatePaymentRequestDto } from './dto/request/CreatePaymentRequestDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('payment')
@UseGuards(AuthGuard, RolesGuard)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    //Get all payments
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<Payment[]> {
        return this.paymentService.findAll();
    }

    //Get payment by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
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
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Post('create')
    createCategory(@Body() createPaymentDto: CreatePaymentResponseDto) {
        console.log(createPaymentDto);
        return this.paymentService.create(createPaymentDto);
    }

    //Update payment
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Put(':id')
    async update( @Param('id') id: number, @Body() payment: Payment): Promise<any> {
        return this.paymentService.update(id, payment);
    }

    //Delete payment
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
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