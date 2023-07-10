import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QrCode } from "./entity/qrCode.entity";
import { CreateQrCodeDto } from "./dto/request/CreateQrCode.dto";
import * as QRcode from 'qrcode';
import { CreateQrCodeResponseDto } from "./dto/response/CreateQrCodeResponse.dto";

@Injectable()
export class QrCodeService{
    constructor(
        @InjectRepository(QrCode)
        private qrCodeRepository: Repository<QrCode>,
    ) {}

    async findAll(): Promise<QrCode[]> {
        return this.qrCodeRepository.find();
    }

    async findOne(id: number): Promise<QrCode> {
        return this.qrCodeRepository.findOne({ where: {id}});
    }

    async create(createQrCodeDto: CreateQrCodeDto): Promise<CreateQrCodeResponseDto> {
        const { url, table } = createQrCodeDto;

        const qrCode = new QrCode();
        qrCode.code_image = await QRcode.toDataURL(url);
        qrCode.table = table;

        const result = await this.qrCodeRepository.save(qrCode);

        const response = new CreateQrCodeResponseDto();
        response.id = result.id;
        response.code_image = result.code_image;
        response.table = result.table;

        return response;
    }

    async update(id: number, qrCode: Partial<QrCode>): Promise<QrCode> {
        await this.qrCodeRepository.update(id, qrCode);
        return this.qrCodeRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.qrCodeRepository.delete(id);
    }
}