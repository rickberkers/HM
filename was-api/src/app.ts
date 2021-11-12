import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import env from './plugins/env';
import typeorm from './plugins/typeorm';
import services from './plugins/services';
import sensible from './plugins/sensible';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  
  // This loads all plugins
  fastify.register(sensible);
  fastify.register(env);
  fastify.register(typeorm);
  fastify.register(services);

  // This loads all plugins defined in routes
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app }

// TODO Look into dates & utc
// TODO add helmet and rate-limiter, possibly implement more security measures
// TODO NPM run scripts: fix the tsc && ... ones that dont work
// TODO create .d.ts for all module decleration plugins
// TODO done figure out which indices are required or suited
// TODO Create migrations and disable synchronize
// TODO use in app.ts AppOptions
// TODO good error handling
// TODO use sensible
// TODO setup tests complex pieces of code
// TODO figure out logging
// TODO add tslint or similar
// TODO Put utils and models in was-common