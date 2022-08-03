import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAuth from '@fastify/auth';
import fp from 'fastify-plugin'
import { AccessTokenPayload, RefreshTokenPayload, TokenPair } from '@models/Tokens';
import { PublicUser } from '@models/User';

const REFRESH_TOKEN_COOKIE_NAME = "was_refreshToken";

/**
 * This plugins adds auth strategy decorators
 *
 * @see https://github.com/fastify/fastify-auth
 */
export default fp(async (fastify, opts) => {

    fastify.register(fastifyAuth);

    const verifyAccessToken = async (request: FastifyRequest) => {

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
            request.authenticatedUser = fastify.jwt.verifyJWT<AccessTokenPayload>(token, { 
                maxAge: fastify.config.ACCESS_TOKEN_MAX_AGE || 900000, // 15 min
            });
        } catch (error) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }
    }

    /**
     * Only verifies that the refreshToken cookie is valid when present
     */
    const verifyRefreshTokenOptional = async (request: FastifyRequest) => {
        
        const token = getRefreshCookieValue(request);
        if(!token) {
            return;
        }

        request.authenticatedUser = await verifyRefreshTokenWithUser(token);
    }

    /**
     * Verifies that the refreshToken cookie is valid and present
     */
    const verifyRefreshTokenRequired = async (request: FastifyRequest) => {

        const token = getRefreshCookieValue(request);
        if(!token) {
            throw fastify.httpErrors.unauthorized("no token");
        }

        request.authenticatedUser = await verifyRefreshTokenWithUser(token);
    }

    /**
     * Verifies validity of token
     */
    const verifyRefreshTokenWithUser = async (token: string): Promise<PublicUser> => {

        let payload;
        try {
            payload = fastify.jwt.verifyJWT<RefreshTokenPayload>(token, {
                maxAge: 2678400000 // 31 days in ms
            });
        } catch (error) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }

        // Verify with token with DB
        const user = await fastify.services.userService.getById(payload.id);
        if (user == undefined || await fastify.services.userService.getRefreshTokenByUserId(user.id) != token) {
            throw fastify.httpErrors.unauthorized("invalid token");
        }

        return user;
    }

    /**
     * Obtains refreshToken cookie from request
     */
    const getRefreshCookieValue = (request: FastifyRequest): string | null => {

        // Cookie presence
        const rawCookie = request.cookies[REFRESH_TOKEN_COOKIE_NAME];
        if (!rawCookie) {
            return null;
        }

        // Cookie validity
        const unsignedRefreshToken = request.unsignCookie(rawCookie);
        if (!unsignedRefreshToken.valid) {
            return null;
        }
        return unsignedRefreshToken.value!;
    }

    fastify.decorate("verifyRefreshTokenOptional", verifyRefreshTokenOptional);
    fastify.decorate("verifyRefreshTokenRequired", verifyRefreshTokenRequired);
    fastify.decorate("verifyAccessToken", verifyAccessToken);

    fastify.decorateRequest("authenticatedUser", undefined);

    fastify.decorateReply("clearRefreshTokenCookie", function(path: string): FastifyReply {
        return this.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
            path: path
        });
    });

    fastify.decorateReply("setRefreshTokenCookie", function (value: string, path: string): FastifyReply {
        return this.cookie(REFRESH_TOKEN_COOKIE_NAME, value, {
            path: path
        });
    });

    fastify.decorate("generateTokenPair", function(previousPayload: AccessTokenPayload): TokenPair {
        return {
            refreshToken: fastify.jwt.signJWT({ id: previousPayload.id } as AccessTokenPayload),
            accessToken: fastify.jwt.signJWT({ id: previousPayload.id, name: previousPayload.name } as RefreshTokenPayload)
        };
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        verifyAccessToken(request: FastifyRequest): Promise<void>;
        verifyRefreshTokenRequired(request: FastifyRequest): Promise<void>;
        verifyRefreshTokenOptional(request: FastifyRequest): Promise<void>;
        generateTokenPair(previousPayload: AccessTokenPayload): TokenPair;
    }
    export interface FastifyRequest {
        authenticatedUser: AccessTokenPayload | null;
    }
    export interface FastifyReply {
        setRefreshTokenCookie(value: string, path: string): FastifyReply;
        clearRefreshTokenCookie(path: string): FastifyReply;
    }
}