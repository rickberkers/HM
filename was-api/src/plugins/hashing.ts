import fp from 'fastify-plugin'
import * as argon2 from "argon2";

/**
 * This plugins adds hashing functions using argon2
 */
export default fp(async (fastify, opts) => {

  const hashingOptions = {
    memoryCost: fastify.config.HASH_MEMCOST,
    timeCost: fastify.config.HASH_TIMECOST
  }

  fastify.decorate<HashingFunctions>('hasher', {
    hash: async (data: string) => {
      return await argon2.hash(data, hashingOptions);
    },
    //TODO check if lack of options in compare functions gives bad comparison
    compare: async (originalHash: string, data: string) => {
      return argon2.verify(originalHash, data, hashingOptions);
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