import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAuth from 'fastify-auth';
import fp from 'fastify-plugin'
import { AccessTokenPayload, RefreshTokenPayload, TokenPair } from '../types/Tokens';
import { PublicUser } from '../types/User';

const REFRESH_TOKEN_COOKIE_NAME = "was_refreshToken";
const REFRESH_TOKEN_COOKIE_PATH = "/me/token";

/**
 * This plugins adds auth strategy decorators
 *
 * @see https://github.com/fastify/fastify-auth
 */
export default fp(async (fastify, opts) => {
    fastify.register(fastifyAuth);

    fastify.decorateRequest("authenticatedUser", undefined);

    fastify.decorate("verifyAccessToken", async function(request: FastifyRequest, reply: FastifyReply) {

        // Get token from authorization header
        let token = request.headers.authorization;
        if (token == undefined) {
            throw fastify.httpErrors.unauthorized("no token");
        }
        const tokenArray = token.split(" ");
        if(!token.startsWith("Bearer") || tokenArray.length != 2) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
        token = tokenArray[1];

        // Verify token
        try {
            const payload = fastify.jwt.verifyJWT<AccessTokenPayload>(token, { 
                maxAge: fastify.config.ACCESS_TOKEN_MAX_AGE || 900000, // 15 min
            });
            request.authenticatedUser = await fastify.services.userService.getById(payload.id);;
        } catch (error) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
    });

    fastify.decorate("verifyRefreshToken", async function(request: FastifyRequest, reply: FastifyReply) {

        // Get refresh token cookie
        const cookie = request.cookies[REFRESH_TOKEN_COOKIE_NAME];
        if (cookie == undefined) {
            throw fastify.httpErrors.unauthorized("no token");
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
            payload = fastify.jwt.verifyJWT<RefreshTokenPayload>(cookieRefreshToken, {
                maxAge: 2678400000 // 31 days in ms
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

    fastify.decorateReply("clearRefreshTokenCookie", function(): FastifyReply {
        return this.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
            path: REFRESH_TOKEN_COOKIE_PATH
        });
    });

    fastify.decorateReply("setRefreshTokenCookie", function (value: string): FastifyReply {
        return this.cookie(REFRESH_TOKEN_COOKIE_NAME, value, {
            path: REFRESH_TOKEN_COOKIE_PATH
        });
    });

    fastify.decorate("generateTokenPair", function(user: PublicUser): TokenPair {
        return {
            refreshToken: fastify.jwt.signJWT({ id: user.id } as AccessTokenPayload),
            accessToken: fastify.jwt.signJWT({ id: user.id, name: user.name } as RefreshTokenPayload)
        };
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        verifyAccessToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
        verifyRefreshToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
        generateTokenPair(user: PublicUser): TokenPair;
    }
    export interface FastifyRequest {
        authenticatedUser?: PublicUser;
    }
    export interface FastifyReply {
        setRefreshTokenCookie(value: string): FastifyReply;
        clearRefreshTokenCookie(): FastifyReply;
    }
}