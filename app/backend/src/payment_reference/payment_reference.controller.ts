import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreatePaymentRefResponseDto } from './dto/response/CreatePaymentRefResponseDto.dto';
import { PaymentReference } from './entity/paymentReference.entity';
import { PaymentRefService } from './payment_reference.service';

@Controller('payment-ref')
export class PaymentRefController {
    constructor (private readonly paymentRefService: PaymentRefService) {}

    //Get all payment ref
    @Get()
    async findAll(): Promise<PaymentReference[]> {
        return this.paymentRefService.findAll();
    }

    //Get payment ref by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PaymentReference> {
        const paymentRef = await this.paymentRefService.findOne(id);
        if(!paymentRef) {
            throw new NotFoundException('Payment reference not found!');
        } else {
            return paymentRef;
        }
    }

    //Create payment reference
    @Post('create')
    createPaymentRef(@Body() createPaymentRefDto: CreatePaymentRefResponseDto) {
        console.log(createPaymentRefDto);
        return this.paymentRefService.create(createPaymentRefDto);
    }

    //Update payment reference
    @Put(':id')
    async update( @Param('id') id: number, @Body() paymentReference: PaymentReference): Promise<any> {
        return this.paymentRefService.update(id, paymentReference);
    }

    //Delete payment reference
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if payment reference does not exist
        const paymenrRef = await this.paymentRefService.findOne(id);
        if (!paymenrRef) {
            throw new NotFoundException('Payment reference not exist');
        }
        return this.paymentRefService.delete(id);
    }

}