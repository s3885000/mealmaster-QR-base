import { Module } from "@nestjs/common";
import { TableController } from "./table.controller";
import { TableService } from "./table.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tables } from "./entity/table.entity";
import { QrCodeModule } from "src/qr_code/qr_code.module";

@Module({
    imports: [
        QrCodeModule,
        TypeOrmModule.forFeature([Tables])],
    controllers: [TableController],
    providers: [TableService]
})
export class TableModule {}