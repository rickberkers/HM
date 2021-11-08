import { FastifyPluginAsync } from "fastify"

const me: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })
}

export default me;
