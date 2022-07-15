import fastifyEnv from 'fastify-env';
import fp from 'fastify-plugin'

declare module 'fastify' {
    export interface FastifyInstance {
        config: {
            DB_TYPE: string,
            DB_HOST: string,
            DB_PORT: number,
            DB_USERNAME: string,
            DB_PASSWORD: string,
            DB_NAME: string,
            JWT_SECRET: string,
            COOKIE_SECRET: string,
            COOKIE_DOMAIN: string,
            HASH_MEMCOST: number,
            HASH_PARALELL: number,
            HASH_TIMECOST: number,
            DEVELOPMENT: boolean,
            ACCESS_TOKEN_MAX_AGE: number,
            APP_URL: string
        };
    }
}

const schema = {
    type: 'object',
    required: [ 'DB_TYPE', 'DB_HOST', 'DB_PORT', 
                'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 
                'JWT_SECRET', 'COOKIE_SECRET', 'COOKIE_DOMAIN',
                'HASH_MEMCOST', 'HASH_PARALELL', 'ACCESS_TOKEN_MAX_AGE',
                'HASH_TIMECOST', 'DEVELOPMENT', 'APP_URL' ],
    properties: {
        DB_TYPE: { type: 'string' },
        DB_HOST: { type: 'string' },
        DB_PORT: { type: 'number' },
        DB_USERNAME: { type: 'string' },
        DB_PASSWORD: { type: 'string' },
        DB_NAME: { type: 'string' },
        JWT_SECRET: { type: 'string' },
        COOKIE_SECRET: { type: 'string' },
        COOKIE_DOMAIN: { type: 'string' },
        HASH_MEMCOST: { type: 'number' },
        HASH_PARALELL: { type: 'number' },
        HASH_TIMECOST: { type: 'number' },
        DEVELOPMENT: { type: 'boolean' },
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
        dotenv: true, // supports .env files
        schema
    });
});