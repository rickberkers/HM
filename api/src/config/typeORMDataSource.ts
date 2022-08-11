import 'dotenv/config'
import { join } from "path";
import { DataSource } from "typeorm";

// Do not use tsconfig @ path imports here. Typeorm commands can't resolve

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
  ...(process.env.NODE_ENV == 'production' && {ssl: { rejectUnauthorized: false }}) // 
});

export default typeORMDataSource;