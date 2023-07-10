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
        return this.qrCodeRepository.findOne({ where: {id} })
    }

    async create(createQrCodeDto: CreateQrCodeDto): Promise<CreateQrCodeResponseDto> {
        const {table_id} = createQrCodeDto;

        const qrCode = new QrCode();
        qrCode.table_id = table_id;
        
        const url = `http://localhost:3000/menu?table=${table_id}`;

        qrCode.code_image = await QRcode.toDataURL(url);

        const result = await this.qrCodeRepository.save(qrCode);

        const response = new CreateQrCodeResponseDto();
        response.id = result.id;
        response.table_id = result.table_id;
        response.code_image = result.code_image;

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