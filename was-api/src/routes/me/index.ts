import { FastifyPluginAsync } from "fastify"
import { getRefreshTokenBody, getRefreshTokenSchema, postRegisterBody, registerUserSchema } from "./schemas";
import { CreateUserData } from "../../types/User";
import { RefreshTokenPayload } from "../../types/Tokens";

const me: FastifyPluginAsync = async (fastify): Promise<void> => {
  /**
   * Register
   */
  fastify.post<{ Body: postRegisterBody }>('/', {
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
    fastify.post<{ Body: getRefreshTokenBody }>('/refresh', {
      schema: getRefreshTokenSchema
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
      return reply.cookie(fastify.config.REFRESH_TOKEN_COOKIE_NAME, tokenPair.refreshToken).send(tokenPair.accessToken);
    });

    // Access token
    fastify.post('/', async (request, reply) => {
      // Get refresh token cookie
      const cookie = request.cookies[fastify.config.REFRESH_TOKEN_COOKIE_NAME];
      if (cookie == null) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // Checks if cookie was unsigned correctly
      const unsignedRefreshToken = request.unsignCookie(cookie);
      if (!unsignedRefreshToken.valid) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }
      const cookieRefreshToken = unsignedRefreshToken.value!;

      // Verifies token and gets payload
      let payload: RefreshTokenPayload;
      try {
        payload = fastify.jwt.verify<RefreshTokenPayload>(cookieRefreshToken, {
          maxAge: "31d" // 31 days in ms
        });
      } catch (error) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // Verify that the user id still matches with a user
      const user = await fastify.services.userService.getById(payload.id);
      if (user == undefined) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // Verify that the user exists and that the refresh token matches the one in the payload
      if (user == undefined || await fastify.services.userService.getRefreshTokenByUserId(payload.id) != cookieRefreshToken) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // generate new tokenpair and store new refreshtoken
      const tokenPair = fastify.generateTokenPair(user);
      await fastify.services.userService.setRefreshToken(user.id, tokenPair.refreshToken);

      // Set refreshtoken as cookie in response along with the accesstoken
      return reply.cookie(fastify.config.REFRESH_TOKEN_COOKIE_NAME, tokenPair.refreshToken).send(tokenPair.accessToken);
    });

  }, { prefix: 'token' });
};

export default me;