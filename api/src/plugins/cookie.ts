import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import isProductionNodeEnv from '@utils/env';
import fp from 'fastify-plugin'

/**
 * This plugins adds cookie functionality using fastify-cookie
 *
 * @see https://github.com/fastify/fastify-cookie
 */
export default fp<FastifyCookieOptions>(async (fastify, opts) => {
  /**
   * Options were configured for the refresh token, if cookies need
   * to be used for other usecases move these options to where the
   * refreshtoken are created
  */
  fastify.register(fastifyCookie, {
      secret: fastify.config.COOKIE_SECRET,
      parseOptions: { 
          secure: isProductionNodeEnv,
          sameSite: "none",
          maxAge: 5184000, // 60 days
          signed: true,
          httpOnly: true,
      }
  });
});