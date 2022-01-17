import { FastifyPluginAsync } from "fastify"
import { getTokenBody, getTokenSchema } from "./schemas";
import { getUnixTime } from 'date-fns';

const me: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: getTokenBody }>('/token', {
    schema: getTokenSchema
  }, async (request, reply) => {

    const validated = await fastify.services.userService.validatePassword(
      request.body.name, 
      request.body.password
    );

    if (!validated) {
      throw fastify.httpErrors.badRequest("password is incorrect");
    }

    const user = await fastify.services.userService.getByName(request.body.name);

    const token = fastify.jwt.sign({
      id: user!.id, //TODO test to see what happens if it is null with bang operator
      name: user!.name, 
      iat: getUnixTime(new Date())
    });

    return { token };
  });
  // fastify.get('/', {
  //   schema: meSchema
  // }, async (request, reply) => {
  //   return "hello world";
  // });
};

export default me;