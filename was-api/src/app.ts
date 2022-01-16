import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import env from './plugins/env';
import typeorm from './plugins/typeorm';
import services from './plugins/services';
import sensible from './plugins/sensible';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  // This loads all plugins
  fastify.register(sensible);
  fastify.register(env);
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

// TODO add helmet and rate-limiter, possibly implement more security measures on production
// TODO NPM run scripts: fix the tsc && ... ones that dont work
// TODO done figure out which indices are required or suited
// TODO Create migrations and disable synchronize
// TODO setup tests complex pieces of code
// TODO Put utils and models in was-common
// TODO Refactor which packages is should use
// TODO address vulnerabilities