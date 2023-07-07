import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tables } from "./entity/table.entity";
import { CreateTableDto } from "./dto/CreateTable.dto";

@Injectable()
export class TableService{
    constructor(
        @InjectRepository(Tables)
        private tableRepository: Repository<Tables>,
    ) {}

    async findAll(): Promise<Tables[]> {
        return this.tableRepository.find();
    }

    async findOne(id: number): Promise<Tables> {
        return this.tableRepository.findOne({ where: {id} })
    }

    async create(createTableDto: CreateTableDto): Promise<string> {
        const {restaurant_id, qr_code_id, table_no, description} = createTableDto;

        const table = new Tables();
        table.restaurant_id = restaurant_id;
        table.qr_code_id = qr_code_id;
        table.table_no = table_no;
        table.description = description;

        await this.tableRepository.save(table);

        return 'Table Added';
    }

    async update(id: number, table: Partial<Tables>): Promise<Tables> {
        await this.tableRepository.update(id, table);
        return this.tableRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.tableRepository.delete(id);
    }
}