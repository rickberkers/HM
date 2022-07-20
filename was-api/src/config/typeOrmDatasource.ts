import { FastifyInstance } from "fastify";
import 'dotenv/config'
import { join } from "path";
import { DataSource } from "typeorm";

export const typeORMDataSource = (cf: FastifyInstance['config']) => {
    return new DataSource({
      name: 'default',
      type: 'postgres',
      host: cf.DB_HOST ?? process.env.DB_HOST,
      port: cf.DB_PORT ?? process.env.DB_NAME,
      username: cf.DB_USERNAME ?? process.env.DB_USERNAME,
      password: cf.DB_PASSWORD ?? process.env.DB_PASSWORD,
      database: cf.DB_NAME ?? process.env.DB_NAME,
      entities: [join(__dirname, '..', `entities/*.{ts,js}`)],
      migrationsTableName: "migrations_table",
      migrations: [join(__dirname, '..', `migrations/*.{ts,js}`)],
    });
}

export default typeORMDataSource;