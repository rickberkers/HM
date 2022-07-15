import { CreateUserData } from "@models/User";
import { FastifyPluginAsync } from "fastify"
import { LoginBody, LoginSchema, postRegisterBody, registerUserSchema } from "./schemas";

const me: FastifyPluginAsync = async (fastify): Promise<void> => {
  /**
   * Register
   */
  fastify.post<{ Body: postRegisterBody }>('/register', {
    schema: registerUserSchema
  }, async (request, reply) => {

    if (await fastify.services.userService.userExists(request.body.name)) {
      throw fastify.httpErrors.unprocessableEntity("name is taken");
    }

    const newUserData: CreateUserData = {
      ...request.body,
      hash: await fastify.hasher.hash(request.body.password)
    };

    return await fastify.services.userService.create(newUserData);
  });

  /**
   * Token routes
   */
  fastify.register(async (fastify) => {
    
    // Refresh token (a.k.a login)
    fastify.post<{ Body: LoginBody }>('/login', {
      schema: LoginSchema
    }, async (request, reply) => {

      const attemptedAccount = await fastify.services.userService.getByName(request.body.name);
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
      return reply.setRefreshTokenCookie(tokenPair.refreshToken).send(tokenPair.accessToken);
    });

    // Access token
    fastify.post('/refresh', { preValidation: fastify.verifyRefreshToken }, async (request, reply) => {
      // generate new tokenpair and store new refreshtoken
      const tokenPair = fastify.generateTokenPair(request.authenticatedUser!);
      await fastify.services.userService.setRefreshToken(request.authenticatedUser!.id, tokenPair.refreshToken);
      // Set refreshtoken as cookie in response along with the accesstoken
      return reply.setRefreshTokenCookie(tokenPair.refreshToken).send(tokenPair.accessToken);
    });

    // Logout
    fastify.delete('/', { preValidation: fastify.verifyRefreshToken }, async (request, reply) => {
        fastify.services.userService.setRefreshToken(request.authenticatedUser!.id, null);
        return reply.clearRefreshTokenCookie().status(204).send();
    });

  }, { prefix: 'token' });
};

export default me;