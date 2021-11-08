import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import envPlugin from './plugins/env';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  
  // Explicitly loaded plugins

  // Env needs to be loaded before everything else
  fastify.register(envPlugin);

  // This loads all plugins defined in plugins/autoload
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins', 'autoload'),
    options: opts
  });

  // This loads all services defined in services
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'services'),
    options: opts
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  });
};

export default app;
export { app }
