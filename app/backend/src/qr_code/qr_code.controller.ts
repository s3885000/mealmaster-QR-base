import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { QrCode } from './entity/qrCode.entity';
import { CreateQrCodeDto } from './dto/request/CreateQrCode.dto';
import { QrCodeService } from './qr_code.service';
import { CreateQrCodeResponseDto } from './dto/response/CreateQrCodeResponse.dto';

@Controller('qr_code') 
export class QrCodeController {
    constructor(private readonly qrCodeService: QrCodeService) {}

    //Get all QR codes
    @Get()
    async findAll(): Promise<QrCode[]> {
        return this.qrCodeService.findAll();
    }

    //Get QR code by id
    @Get('id')
    async findOne(@Param('id') id: number): Promise<QrCode> {
        const qrCode = await this.qrCodeService.findOne(id);
        if(!qrCode) {
            throw new NotFoundException('QR code not found!');
        } else {
            return qrCode;
        }
    }

    //Create QR code
    @Post('create')
    createQrCode(@Body() createQrCodeDto: CreateQrCodeDto): Promise<CreateQrCodeResponseDto> {
        return this.qrCodeService.create(createQrCodeDto);
    }

    //Update QR code
    @Put(':id')
    async update( @Param('id') id: number, @Body() qrCode: QrCode): Promise<any> {
        return this.qrCodeService.update(id, qrCode);
    }

    //Delete QR code
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