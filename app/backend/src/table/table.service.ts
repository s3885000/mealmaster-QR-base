import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tables } from "./entity/table.entity";
import { CreateTableDto } from "./dto/request/CreateTable.dto";
import { createTableResponseDto } from "./dto/response/CreateTableResponseDto.dto";
import { QrCodeService } from "src/qr_code/qr_code.service";
import { CreateQrCodeDto } from "src/qr_code/dto/request/CreateQrCode.dto";

@Injectable()
export class TableService{
    constructor(
        @InjectRepository(Tables)
        private tableRepository: Repository<Tables>,
        private qrCodeService: QrCodeService,
    ) {}

    async findAll(): Promise<Tables[]> {
        return this.tableRepository.find();
    }

    async findOne(id: number): Promise<Tables> {
        return this.tableRepository.findOne({ where: { id }})
    }

    async create(createTableDto: CreateTableDto): Promise<createTableResponseDto> {
        const {restaurant_id, table_no, description} = createTableDto;

        const table = new Tables();
        table.restaurant_id = restaurant_id;
        table.table_no = table_no;
        table.description = description;

        const savedTable = await this.tableRepository.save(table);

        const url = `http://localhost:3000/menu?table=${savedTable.id}`;

        const qrCodeDto: CreateQrCodeDto = { url, table: savedTable};

        const qrCode = await this.qrCodeService.create(qrCodeDto);

        //Update the table with the newly created qrCode
        savedTable.qr_code = qrCode;
        await this.tableRepository.save(savedTable);

        const createTableResponseDto: createTableResponseDto = {
            restaurant_id: table.restaurant_id,
            table_no: table.table_no,
            qr_code_id: qrCode.id,
            description: table.description,
        };

        return createTableResponseDto;
    }

    async update(id: number, table: Partial<Tables>): Promise<Tables> {
        await this.tableRepository.update(id, table);
        return this.tableRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.tableRepository.delete(id);
    }
}