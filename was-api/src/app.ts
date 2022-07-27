import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import env from '@plugins/env';
import typeorm from '@plugins/typeorm';
import services from '@plugins/services';
import sensible from '@plugins/sensible';
import jwt from '@plugins/jwt';
import hashing from '@plugins/hashing';
import auth from '@plugins/auth';
import cookie from '@plugins/cookie';
import cors from '@plugins/cors';
import ajvErrors from 'ajv-errors';

/**
 * Custom options for instantiating the fastify-cli `--options`
 * // TODO see how to do this when fastify-cli isn't used, e.g. in production
 * @see https://github.com/fastify/fastify-cli
 */
export const options: FastifyServerOptions = {
  ajv: {
    customOptions: {
      allErrors: true,
    },
    plugins: [ajvErrors]
  }
}

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  // This loads all plugins
  fastify.register(sensible);
  fastify.register(env);
  fastify.register(cors);
  fastify.register(cookie);
  fastify.register(auth);
  fastify.register(hashing);
  fastify.register(jwt);
  fastify.register(typeorm);
  fastify.register(services);

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    ignorePattern: /.*schemas(\.ts|\.js|\.cjs|\.mjs)$/,
    routeParams: true
    // Above line ignores schema files
  });
};

export default app;
export { app }

// TODO revise hashing options
// TODO add helmet and rate-limiter, possibly implement more security measures on production
// TODO setup tests complex pieces of code
// TODO Logging sort out
// TODO shared schemas
// TODO Look into AVJ errors for hiding specific validation failures
