import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateOrderStatusResponseDto } from './dto/response/CreateOrderStatusResponseDto.dto';
import { CreateOrderStatusRequestDto } from './dto/request/CreateOrderStatusRequestDto.dto';
import { OrderStatus } from './entity/orderStatus.entity';
import { OrderStatusService } from './order_status.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('order-status')
@UseGuards(AuthGuard, RolesGuard)
export class OrderStatusController {
    constructor(private readonly orderStatusService: OrderStatusService) {}

    // Get all order status
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get()
    async findAll(): Promise<OrderStatus[]> {
        return this.orderStatusService.findAll();
    }

    //Get order by id
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<OrderStatus> {
        const orderStatus = await this.orderStatusService.findOne(id);
        if(!orderStatus) {
            throw new NotFoundException('Order status not found!');
        } else {
            return orderStatus;
        }
    }

    //Create order
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Post('create')
    createOrderStatus(@Body() createOrderStatusDto: CreateOrderStatusResponseDto) {
        console.log(createOrderStatusDto);
        return this.orderStatusService.create(createOrderStatusDto)
    }

    //Update order
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Put(':id')
    async update( @Param('id') id: number, @Body() orderStatus: OrderStatus): Promise<any> {
        return this.orderStatusService.update(id, orderStatus);
    }

    //Delete order
    @Roles(UserRole.RESTAURANT_OWNER, UserRole.CUSTOMER, UserRole.GUEST)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if order does not exist
        const orderStatus = await this.orderStatusService.findOne(id);
        if (!orderStatus) {
            throw new NotFoundException('Order status does not exist');
        }
        return this.orderStatusService.delete(id);
    }
}