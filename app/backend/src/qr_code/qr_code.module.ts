import { Module } from '@nestjs/common';
import { QrCodeController } from './qr_code.controller';
import { QrCodeService } from './qr_code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrCode } from './entity/qrCode.entity';

@Module({
    imports: [TypeOrmModule.forFeature([QrCode])],
    controllers: [QrCodeController],
    providers: [QrCodeService]
})
export class QrCodeModule {}
