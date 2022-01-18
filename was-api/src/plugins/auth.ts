import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAuth from 'fastify-auth';
import fp from 'fastify-plugin'

/**
 * This plugins adds auth strategy decorators
 *
 * @see https://github.com/fastify/fastify-auth
 */
export default fp(async (fastify, opts) => {       
    fastify.register(fastifyAuth);
    fastify.decorate("verifyToken", async function(request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        verifyToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    }
}