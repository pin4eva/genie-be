import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

export const databaseOptions: DataSourceOptions = {
  type: process.env.DATABASE_TYPE as 'mysql' | 'postgres',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: ['migration'],
  entities: [join(__dirname, '**', '*.entity.js')],
  migrations: [__dirname, '**/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: Boolean(process.env.DATABASE_SSL) || false,
};
const datasource = new DataSource(databaseOptions);
export default datasource;
