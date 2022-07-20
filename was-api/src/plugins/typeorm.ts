import fp from 'fastify-plugin'
import fastifyTypeormPlugin from 'typeorm-fastify-plugin';
import { typeORMDataSource } from '@config/typeOrmDatasource';
import { DataSource } from 'typeorm';

/**
 * Fastify plugin for TypeORM for sharing the same TypeORM 
 * connection in every part of your server.
 *
 * @see https://github.com/jclemens24/fastify-typeorm
 */
export default fp(async (fastify, opts) => {
  const envConfig = fastify.config;
  const typeORMConfig = typeORMDataSource(envConfig);
  fastify.register(fastifyTypeormPlugin, typeORMConfig);  
});

declare module 'fastify' {
  interface FastifyInstance {
      orm: DataSource & FastifyTypeormInstance.FastifyTypeormNamespace;
  }
}
declare namespace FastifyTypeormInstance {
  interface FastifyTypeormNamespace {
      [namespace: string]: DataSource;
  }
}