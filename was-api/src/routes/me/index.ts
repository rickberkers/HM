import { FastifyPluginAsync } from "fastify"
import { getTokenBody, getTokenSchema, postRegisterBody, registerUserSchema } from "./schemas";
import { CreateUserData } from "../../types/User";
import { RefreshToken } from "../../types/Tokens";

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
    fastify.post<{ Body: getTokenBody }>('/refresh', {
      schema: getTokenSchema
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

      const accessToken = fastify.jwt.sign({
        id: attemptedAccount.id,
        name: attemptedAccount.name
      });

      const refreshToken = fastify.jwt.sign({
        id: attemptedAccount.id
      });

      await fastify.services.userService.setRefreshToken(attemptedAccount.id, refreshToken);

      // Set refreshtoken as cookie in response along with the accesstoken
      return reply.cookie("was_refreshToken", refreshToken).send({
        accessToken
      });
    });

    // Access token
    fastify.post<{ Body: getTokenBody }>('/', {
      schema: getTokenSchema
    }, async (request, reply) => {

      // Checks if cookie is present
      const cookie = request.cookies["was_refreshToken"];
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
      let payload: RefreshToken;
      try {
        payload = fastify.jwt.verify<RefreshToken>(cookieRefreshToken, {
          maxAge: 2678400000 // 31 days in ms
        });
      } catch (error) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // Verify that the user id still matches with a user
      const user = await fastify.services.userService.getById(payload.id);
      if (user == undefined) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // Verify that the refresh token is the current one of the user stored in it's payload
      if (await fastify.services.userService.getRefreshTokenByUserId(payload.id) != cookieRefreshToken) {
        throw fastify.httpErrors.unauthorized("invalid token");
      }

      // generate new tokenpair and store new refreshtoken
      const accessToken = fastify.jwt.sign({
        id: user.id,
        name: user.name
      });

      const refreshToken = fastify.jwt.sign({
        id: user.id
      });

      await fastify.services.userService.setRefreshToken(user.id, refreshToken);

      // Send refreshtoken as cookie and new accesstoken
      reply.cookie("was_refreshToken", refreshToken).send({
        accessToken
      });
    });

  }, { prefix: 'token' });
};

export default me;