import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAuth from 'fastify-auth';
import fp from 'fastify-plugin'
import { Interface } from 'readline';
import { AccessTokenPayload, RefreshTokenPayload, TokenPair } from '../types/Tokens';
import { PublicUser } from '../types/User';

/**
 * This plugins adds auth strategy decorators
 *
 * @see https://github.com/fastify/fastify-auth
 */
export default fp(async (fastify, opts) => {
    fastify.register(fastifyAuth);

    fastify.decorate("refreshTokenCookieName", "was_refreshToken");
    fastify.decorateRequest("authenticatedUser", undefined);

    fastify.decorate("verifyAccessToken", async function(request: FastifyRequest, reply: FastifyReply) {
        try {
            const payload = await request.jwtVerify<AccessTokenPayload>({
                maxAge: "900", // 15 min
            });
            const user = await fastify.services.userService.getById(payload.id);
            request.authenticatedUser = user;
        } catch (err) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
    });

    fastify.decorate("verifyRefreshToken", async function(request: FastifyRequest, reply: FastifyReply) {
        // Get refresh token cookie
        const cookie = request.cookies[fastify.refreshTokenCookieName];
        if (cookie == null) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }

        // Checks if cookie was unsigned correctly
        const unsignedRefreshToken = request.unsignCookie(cookie);
        if (!unsignedRefreshToken.valid) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
        const cookieRefreshToken = unsignedRefreshToken.value!;

        // Verifies token and gets payload
        let payload: RefreshTokenPayload;
        try {
            payload = fastify.jwt.verify<RefreshTokenPayload>(cookieRefreshToken, {
                maxAge: "31d" // 31 days in ms
            });
        } catch (error) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }

        // Verify that the user exists and that their refresh token matches the one in the payload
        const user = await fastify.services.userService.getById(payload.id);
        if (user == undefined || await fastify.services.userService.getRefreshTokenByUserId(payload.id) != cookieRefreshToken) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
        request.authenticatedUser = user;
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
        verifyRefreshToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
        generateTokenPair(user: PublicUser): TokenPair;
        refreshTokenCookieName: string;
    }
    export interface FastifyRequest {
        authenticatedUser?: PublicUser;
    }
}