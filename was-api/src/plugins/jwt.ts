import fp from 'fastify-plugin'
import { createSigner, createVerifier, VerifierOptions } from 'fast-jwt';
import { TokenPayload } from '@models/Tokens';

/**
 * This plugins adds JWT functions, using fast-jwt as an
 * underlying library
 */
export default fp(async (fastify, opts) => {

  const sign = createSigner({ key: fastify.config.JWT_SECRET });

  // Decorators
  const jwtDecorators = {
    verifyJWT: <PayloadType>(token: string, options: Partial<VerifierOptions>): PayloadType => {
      const verify = createVerifier(Object.assign({ key: fastify.config.JWT_SECRET }, options));
      return verify(token);
    },
    signJWT: (payload: TokenPayload) => {
      try {
        return sign(payload);
      } catch (error) {
        throw new Error("payload could not be signed");
      }
    }
  };
  fastify.decorate("jwt", jwtDecorators);
});

declare module 'fastify' {
  export interface FastifyInstance {
    jwt: {
      signJWT(payload: TokenPayload): string;
      verifyJWT<PayloadType>(token: string, options: Partial<VerifierOptions>): PayloadType;
    };
  }
}
