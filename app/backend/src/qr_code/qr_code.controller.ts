import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { QrCode } from './entity/qrCode.entity';
import { CreateQrCodeDto } from './dto/request/CreateQrCode.dto';
import { QrCodeService } from './qr_code.service';
import { CreateQrCodeResponseDto } from './dto/response/CreateQrCodeResponse.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/role.dectorator';
import { UserRole } from 'src/user/entity/user.entity';

@Controller('qr_code') 
@UseGuards(AuthGuard, RolesGuard)
export class QrCodeController {
    constructor(private readonly qrCodeService: QrCodeService) {}

    //Get all QR codes
    @Roles(UserRole.RESTAURANT_OWNER)
    @Get()
    async findAll(): Promise<QrCode[]> {
        return this.qrCodeService.findAll();
    }

    //Get QR code by id
    @Roles(UserRole.RESTAURANT_OWNER)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<QrCode> {
        const qrCode = await this.qrCodeService.findOne(id);
        if(!qrCode) {
            throw new NotFoundException('QR code not found!');
        } else {
            return qrCode;
        }
    }

    //Create QR code
    @Roles(UserRole.RESTAURANT_OWNER)
    @Post('create')
    createQrCode(@Body() createQrCodeDto: CreateQrCodeDto): Promise<CreateQrCodeResponseDto> {
        return this.qrCodeService.create(createQrCodeDto);
    }

    //Update QR code
    @Roles(UserRole.RESTAURANT_OWNER)
    @Put(':id')
    async update( @Param('id') id: number, @Body() qrCode: QrCode): Promise<any> {
        return this.qrCodeService.update(id, qrCode);
    }

    //Delete QR code
    @Roles(UserRole.RESTAURANT_OWNER)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        //Handle the error if QR code does not exist
        const qrCode = await this.qrCodeService.findOne(id);
        if (!qrCode) {
            throw new NotFoundException('QR code does not exist');
        }
        return this.qrCodeService.delete(id);
    }
}