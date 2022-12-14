import fastifyEnv from '@fastify/env';
import isProductionNodeEnv from '@utils/env';
import fp from 'fastify-plugin'

export interface envConfig {
    DB_HOST: string,
    DB_PORT: number,
    DB_USERNAME: string,
    DB_PASSWORD: string,
    DB_NAME: string,
    JWT_SECRET: string,
    COOKIE_SECRET: string,
    HASH_MEMCOST: number,
    HASH_PARALELL: number,
    HASH_TIMECOST: number,
    ACCESS_TOKEN_MAX_AGE: number,
    APP_URL: string
}

declare module 'fastify' {
    export interface FastifyInstance {
        config: envConfig
    }
}

const schema = {
    type: 'object',
    required: [ 'DB_HOST', 'DB_PORT', 
                'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 
                'JWT_SECRET', 'COOKIE_SECRET',
                'HASH_MEMCOST', 'HASH_PARALELL', 'ACCESS_TOKEN_MAX_AGE',
                'HASH_TIMECOST', 'APP_URL' ],
    properties: {
        DB_HOST: { type: 'string' },
        DB_PORT: { type: 'number' },
        DB_USERNAME: { type: 'string' },
        DB_PASSWORD: { type: 'string' },
        DB_NAME: { type: 'string' },
        JWT_SECRET: { type: 'string' },
        COOKIE_SECRET: { type: 'string' },
        HASH_MEMCOST: { type: 'number' },
        HASH_PARALELL: { type: 'number' },
        HASH_TIMECOST: { type: 'number' },
        ACCESS_TOKEN_MAX_AGE: { type: 'number' },
        APP_URL: { type: 'string' },
    }
};

/**
 * This plugins adds env config
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp(async (fastify) => {
    fastify.register(fastifyEnv, {
        confKey: 'config', // optional, default: 'config'
        data: process.env, // optional, default: process.env
        dotenv: !isProductionNodeEnv, // supports .env files when developing
        schema
    });
});