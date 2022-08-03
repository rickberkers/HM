import { FastifyPluginAsync } from "fastify";
import { LoginBody, LoginSchema } from "./schema";

/**
 * Token routes
 */
const token: FastifyPluginAsync = async (fastify): Promise<void> => {

    // Obtain refresh token (a.k.a login)
    fastify.post<{ Body: LoginBody }>('/login', {
      schema: LoginSchema
    }, async (request, reply) => {

      const lowerCaseName = request.body.name.toLowerCase();

      const attemptedAccount = await fastify.services.userService.getByLowerCaseName(lowerCaseName);
      if (attemptedAccount == undefined) {
        throw fastify.httpErrors.unauthorized("password is incorrect");
      }

      const existingHash = await fastify.services.userService.getHashByUserId(attemptedAccount.id);
      const passwordsMatch = await fastify.hasher.compare(existingHash, request.body.password);

      if (!passwordsMatch) {
        throw fastify.httpErrors.unauthorized("password is incorrect");
      }

      // generate new tokenpair and store new refreshtoken
      const tokenPair = fastify.generateTokenPair(attemptedAccount);
      await fastify.services.userService.setRefreshToken(attemptedAccount.id, tokenPair.refreshToken);

      // Set refreshtoken as cookie in response along with the accesstoken
      return reply.setRefreshTokenCookie(tokenPair.refreshToken, fastify.prefix).send(tokenPair.accessToken);
    });

    // Refresh the access token with the refresh token
    fastify.post('/refresh', { preValidation: fastify.verifyRefreshTokenRequired }, async (request, reply) => {

      // generate new tokenpair and store new refreshtoken
      const tokenPair = fastify.generateTokenPair(request.authenticatedUser!);
      await fastify.services.userService.setRefreshToken(request.authenticatedUser!.id, tokenPair.refreshToken);

      // Set refreshtoken as cookie in response along with the accesstoken
      return reply.setRefreshTokenCookie(tokenPair.refreshToken, fastify.prefix).send(tokenPair.accessToken);
    });

    // Logout
    fastify.delete('/', { preValidation: fastify.verifyRefreshTokenOptional }, async (request, reply) => {
      if (request.authenticatedUser) {
        await fastify.services.userService.setRefreshToken(request.authenticatedUser.id, null);
      }
      return reply.clearCookie(fastify.prefix).status(204).send();
    });
}

export default token;