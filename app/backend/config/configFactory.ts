import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const configFactory = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
});
