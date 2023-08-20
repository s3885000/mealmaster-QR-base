import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import  configuration  from "./configuration";


@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        })
    ],
    exports: [NestConfigModule],
})
export class ConfigModule {}


