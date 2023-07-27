import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreatePaymentRefResponseDto } from './dto/response/CreatePaymentRefResponseDto.dto';
import { CreatePaymentRefRequestDto } from './dto/request/CreatePaymentRefRequestDto.dto';
import { PaymentReference } from './entity/paymentReference.entity';
import { PaymentRefService } from './payment_reference.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('payment-ref')
@UseGuards(AuthGuard, RolesGuard)
export class PaymentRefController {
    constructor (private readonly paymentRefService: PaymentRefService) {}

    //Get all payment ref
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<PaymentReference[]> {
        return this.paymentRefService.findAll();
    }

    //Get payment ref by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
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
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Post('create')
    createPaymentRef(@Body() createPaymentRefDto: CreatePaymentRefResponseDto) {
        console.log(createPaymentRefDto);
        return this.paymentRefService.create(createPaymentRefDto);
    }

    //Update payment reference
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Put(':id')
    async update( @Param('id') id: number, @Body() paymentReference: PaymentReference): Promise<any> {
        return this.paymentRefService.update(id, paymentReference);
    }

    //Delete payment reference
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
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