import fp from 'fastify-plugin'
import fastifyTypeormPlugin from 'typeorm-fastify-plugin';
import { typeORMConfigDataSource } from '@config/typeORMDataSource';

/**
 * Fastify plugin for TypeORM for sharing the same TypeORM 
 * connection in every part of your server.
 *
 * @see https://github.com/jclemens24/fastify-typeorm
 */
export default fp(async (fastify, opts) => {
  const envConfig = fastify.config;
  const typeORMConfig = typeORMConfigDataSource(envConfig);
  fastify.register(fastifyTypeormPlugin, typeORMConfig.options);  
});