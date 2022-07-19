import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'
import FastifyTypeOrm from "fastify-typeorm-plugin";
import { join } from 'path';
import * as typeorm from 'typeorm';

/**
 * Fastify plugin for TypeORM for sharing the same TypeORM 
 * connection in every part of your server.
 *
 * @see https://github.com/inthepocket/fastify-typeorm-plugin
 */
export default fp(async (fastify, opts) => {
  const envConfig = fastify.config;
  const typeORMConfig = fastifyTypeOrmOptions(envConfig);
  fastify.register(FastifyTypeOrm, typeORMConfig);  
});

const fastifyTypeOrmOptions = (cf: FastifyInstance['config']): typeorm.ConnectionOptions => {
  return typeORMDataSource(cf) as typeorm.ConnectionOptions;
}

export const typeORMDataSource = (cf: FastifyInstance['config']) => {
  return {
    name: 'default',
    type: 'postgres',
    host: cf.DB_HOST,
    port: cf.DB_PORT,
    username: cf.DB_USERNAME,
    password: cf.DB_PASSWORD,
    database: cf.DB_NAME,
    entities: [join(__dirname, '..', `entities/*.{ts,js}`)],
    migrationsTableName: "migrations_table",
    migrations: [join(__dirname, '..', `migrations/*.{ts,js}`)],
  };
}