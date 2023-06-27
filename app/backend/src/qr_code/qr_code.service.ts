import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QrCode } from "./entity/qrCode.entity";
import { CreateQrCodeDto } from "./dto/CreateQrCode.dto";

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

    async create(createQrCodeDto: CreateQrCodeDto): Promise<string> {
        const {restaurant_id, table_id, code_image} = createQrCodeDto;

        const qrCode = new QrCode();
        qrCode.restaurant_id = restaurant_id;
        qrCode.table_id = table_id;
        qrCode.code_image = code_image;

        await this.qrCodeRepository.save(qrCode);

        return 'QR code Added';
    }

    async update(id: number, qrCode: Partial<QrCode>): Promise<QrCode> {
        await this.qrCodeRepository.update(id, qrCode);
        return this.qrCodeRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.qrCodeRepository.delete(id);
    }
}