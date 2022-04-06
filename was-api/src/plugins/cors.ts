import fastifyCors, { FastifyCorsOptions } from 'fastify-cors';
import fp from 'fastify-plugin'

/**
 * This plugins adds cors
 * functionality using fastify-cors
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  fastify.register(fastifyCors, {
    origin: fastify.config.APP_URL,
    credentials: true,
    methods: ['PUT', 'POST', 'GET', 'DELETE']
  });
});