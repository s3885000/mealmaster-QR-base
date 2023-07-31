import { Module } from "@nestjs/common";
import { TableController } from "./table.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tables } from "./entity/table.entity";
import { QrCodeModule } from "src/qr_code/qr_code.module";
import { TableService } from "./table.service";
import { Restaurant } from "src/restaurant/entity/restaurant.entity";

@Module({
    imports: [
        QrCodeModule,
        TypeOrmModule.forFeature([Tables, Restaurant])],
    controllers: [TableController],
    providers: [TableService],
    exports: [TableService],
})
export class TableModule {}