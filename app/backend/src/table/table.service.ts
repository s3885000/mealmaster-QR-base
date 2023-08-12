import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tables } from "./entity/table.entity";
import { CreateTableDto } from "./dto/request/CreateTable.dto";
import { createTableResponseDto } from "./dto/response/CreateTableResponseDto.dto";
import { QrCodeService } from "src/qr_code/qr_code.service";
import { CreateQrCodeDto } from "src/qr_code/dto/request/CreateQrCode.dto";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";

@Injectable()
export class TableService{
    constructor(
        @InjectRepository(Tables)
        private tablesRepository: Repository<Tables>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        private qrCodeService: QrCodeService,
    ) {}

    async findAll(): Promise<Tables[]> {
        return this.tablesRepository.find();
    }

    async findOne(id: number): Promise<Tables> {
        return this.tablesRepository.findOne({ where: { id }})
    }

    async findByRestaurantAndTableNumber(restaurantId: number, tableNo: number): Promise<any> {
        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId }});
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with id ${restaurantId} not found!`);
        }
    
        const table = await this.tablesRepository.findOne({ where: { restaurant: { id: restaurantId }, table_no: tableNo }});
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNo} not found in the given restaurant!`);
        }
    
        return { restaurant, table };
    }


    async create(createTableDto: CreateTableDto): Promise<createTableResponseDto> {
        const { restaurant_id, table_no, description } = createTableDto;

        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurant_id }});

        if (!restaurant) {
            throw new NotFoundException(`Restaurant with id ${restaurant_id} not found`);
        }

        // Check if a table with the same number already exists in the restaurant
        const existingTable = await this.tablesRepository.findOne({ where: { restaurant: { id: restaurant_id }, table_no }});
        if (existingTable) {
            throw new ConflictException(`Table with number ${table_no} already exists in the restaurant`);
        }

        const table = new Tables();
        table.restaurant = restaurant;
        table.table_no = table_no;
        table.description = description;
    
        const savedTable = await this.tablesRepository.save(table);
    
        const url = `http://localhost:3001/menu-overview/${restaurant.id}/table/${table_no}`;
    
        const qrCodeDto: CreateQrCodeDto = { url, table: savedTable};
    
        const qrCode = await this.qrCodeService.create(qrCodeDto);
    
        // Update the table with the newly created qrCode
        savedTable.qr_code = qrCode;
        await this.tablesRepository.save(savedTable);
    
        const createTableResponseDto: createTableResponseDto = {
            restaurant_id: table.restaurant.id,
            table_no: table.table_no,
            qr_code_id: qrCode.id,
            description: table.description,
        };
    
        return createTableResponseDto;
    }
    

    async update(id: number, table: Partial<Tables>): Promise<Tables> {
        await this.tablesRepository.update(id, table);
        return this.tablesRepository.findOne({ where: { id } });
    }

    

    async delete(id: number): Promise<void> {
        await this.tablesRepository.delete(id);
    }
}