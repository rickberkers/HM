import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import env from './plugins/env';
import typeorm from './plugins/typeorm';
import services from './plugins/services';
import sensible from './plugins/sensible';
import jwt from './plugins/jwt';
import hashing from './plugins/hashing';
import auth from './plugins/auth';
import cookie from './plugins/cookie';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  // This loads all plugins
  fastify.register(sensible);
  fastify.register(env);
  fastify.register(cookie);
  fastify.register(auth);
  fastify.register(hashing);
  fastify.register(jwt);
  fastify.register(typeorm);
  fastify.register(services);

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    ignorePattern: /.*schemas(\.ts|\.js|\.cjs|\.mjs)$/
    // Above line ignores schema files
  });
};

export default app;
export { app }

// TODO rotate signed cookies secrets
// TODO rename .env.local to env.example
// TODO add helmet and rate-limiter, possibly implement more security measures on production
// TODO NPM run scripts: fix the tsc && ... ones that dont work
// TODO done figure out which indices are required or suited
// TODO Create migrations and disable synchronize
// TODO setup tests complex pieces of code
// TODO Put utils and models in was-common
// TODO Refactor which packages is should use
// TODO Logging sort out
// TODO shared schemas
// TODO Look into AVJ errors for hiding specific validation failures
