import { CreateUserData } from "@models/User";
import { FastifyPluginAsync } from "fastify"
import { postRegisterBody, registerUserSchema } from "./schemas";

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
};

export default me;