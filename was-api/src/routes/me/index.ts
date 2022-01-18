import { FastifyPluginAsync } from "fastify"
import { getTokenBody, getTokenSchema, postRegisterBody, registerUserSchema } from "./schemas";
import { CreateUserData } from "../../types/User";

const me: FastifyPluginAsync = async (fastify): Promise<void> => {
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
   * Tokens
   */

  fastify.post<{ Body: getTokenBody }>('/token', {
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

    const user = await fastify.services.userService.getByName(request.body.name);

    const token = fastify.jwt.sign({
      id: user!.id, //TODO test to see what happens if it is null with bang operator
      name: user!.name
    });

    return { token };
  });
};

export default me;