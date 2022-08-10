import 'dotenv/config'
import { join } from "path";
import { DataSource } from "typeorm";
import { envConfig } from "@plugins/env";
import isProductionNodeEnv from '@utils/env';

export const typeORMConfigDataSource = (cf: envConfig) => {
  return {
    ...typeORMDataSource,
    host: cf.DB_HOST,
    port: cf.DB_PORT,
    username: cf.DB_USERNAME,
    password: cf.DB_PASSWORD,
    database: cf.DB_NAME
  }
}

const typeORMDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', `entities/*.{ts,js}`)],
  migrationsTableName: "migrations_table",
  migrations: [join(__dirname, '..', `migrations/*.{ts,js}`)],
  synchronize: false,
  ssl: isProductionNodeEnv
});

export default typeORMDataSource;