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
            JWT_SECRET: string
        };
    }
}

const schema = {
    type: 'object',
    required: [ 'DB_TYPE', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET' ],
    properties: {
        DB_TYPE: { type: 'string' },
        DB_HOST: { type: 'string' },
        DB_PORT: { type: 'number' },
        DB_USERNAME: { type: 'string' },
        DB_PASSWORD: { type: 'string' },
        DB_NAME: { type: 'string' },
        JWT_SECRET: { type: 'string' }
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