import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAuth from 'fastify-auth';
import fp from 'fastify-plugin'
import { AccessTokenPayload, RefreshTokenPayload, TokenPair } from '../types/Tokens';
import { PublicUser } from '../types/User';

/**
 * This plugins adds auth strategy decorators
 *
 * @see https://github.com/fastify/fastify-auth
 */
export default fp(async (fastify, opts) => {      
    fastify.register(fastifyAuth);
    fastify.decorate("verifyAccessToken", async function(request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify({
                maxAge: "900", // 15 min
            });
        } catch (err) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
    });
    /**
     * Generates refresh and access token
     */
    fastify.decorate("generateTokenPair", function(user: PublicUser): TokenPair {
        return {
            refreshToken: fastify.jwt.sign({ id: user.id } as AccessTokenPayload),
            accessToken: fastify.jwt.sign({ id: user.id, name: user.name } as RefreshTokenPayload)
        };
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        verifyAccessToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
        generateTokenPair(user: PublicUser): TokenPair;
    }
}