import fp from 'fastify-plugin'
import * as argon2 from "argon2";

/**
 * This plugins adds hashing functions using argon2
 */
export default fp(async (fastify, opts) => {
  fastify.decorate<HashingFunctions>('hasher', {

    const pepper = fastify.config.

    hash: async (data: string) => {
      return await argon2.hash(data + pepper);
    },
    compare: async (originalHash: string, data: string) => {
      return argon2.verify(originalHash, data + pepper);
    }
  });
});

interface HashingFunctions {
  hash(data: string, salt: string): Promise<string>;
  compare(originalHash: string, data: string, salt: string): Promise<boolean>;
}

declare module 'fastify' {
  export interface FastifyInstance {
      hasher: HashingFunctions;
  }
}