import fastifyEnv, { fastifyEnvOpt } from 'fastify-env'
import fp from 'fastify-plugin'

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-env
 */
 export default fp<fastifyEnvOpt>(async (fastify, opts) => {
    fastify.register(fastifyEnv, {
        confKey: 'config', // optional, default: 'config'
        data: process.env, // optional, default: process.env
        dotenv: true, // supports .env files
        schema: {
            type: 'object',
            required: [ 'DB_TYPE', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME' ],
            properties: {
                DB_TYPE: { type: 'string' },
                DB_HOST: { type: 'string' },
                DB_PORT: { type: 'number' },
                DB_USERNAME: { type: 'string' },
                DB_PASSWORD: { type: 'string' },
                DB_NAME: { type: 'string' },
            }
        },
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        config: {
            DB_TYPE: string,
            DB_HOST: string,
            DB_PORT: number,
            DB_USERNAME: string,
            DB_PASSWORD: string,
            DB_NAME: string,
        };
    }
}