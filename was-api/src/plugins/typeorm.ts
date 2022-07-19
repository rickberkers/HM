import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'
import FastifyTypeOrm from "fastify-typeorm-plugin";
import { typeORMDataSource } from '@config/typeOrmDatasource';
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