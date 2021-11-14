import { FastifyPluginAsync } from "fastify"
import { meSchema } from "./schemas";

const me: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: meSchema
  }, async (request, reply) => {
    return "hello world";
  });
};

export default me;