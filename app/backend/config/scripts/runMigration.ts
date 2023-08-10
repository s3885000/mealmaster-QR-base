import { createConnection } from 'typeorm';
import databaseConfig from '../database.config';

const runMigration = async () => {
  try {
    const config = databaseConfig();
    const connection = await createConnection({
      type: config.type as 'mysql',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
    });

    await connection.runMigrations();

    console.log('Migrations are finished');
  } catch (error) {
    console.error('Error running migrations', error);
  }
};

runMigration();
