import 'dotenv/config'
import { envConfig } from "@plugins/env";
import typeORMDataSource from './typeORMDataSource';

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