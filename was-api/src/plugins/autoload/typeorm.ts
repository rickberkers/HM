import fp from 'fastify-plugin'
import * as FastifyTypeOrm from "fastify-typeorm-plugin";
import { join } from 'path';

/**
 * Fastify plugin for TypeORM for sharing the same TypeORM 
 * connection in every part of your server.
 *
 * @see https://github.com/inthepocket/fastify-typeorm-plugin
 */
export default fp<FastifyTypeOrm.FastifyTypeormOptions>(async (fastify, opts) => {
  const cf = fastify.config;
  fastify.register(FastifyTypeOrm, {
    name: 'default',
    type: 'postgres',
    host: cf.DB_HOST,
    port: cf.DB_PORT,
    username: cf.DB_PASSWORD,
    password: cf.DB_PASSWORD,
    database: cf.DB_NAME,
    entities: [join(__dirname, '**', `entities/*.{ts,js}`)],
    synchronize: true
  });
});
