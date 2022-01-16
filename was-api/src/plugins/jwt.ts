import fp from 'fastify-plugin'
import fastifyJwt, { FastifyJWTOptions } from 'fastify-jwt'

/**
 * This plugins adds JWT functions, using fast-jwt as an
 * underlying library
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp<FastifyJWTOptions>(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET
  });
});