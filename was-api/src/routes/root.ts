import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    //return { root: true }
    const rick = new Date();
    return rick;
  });
};

export default root;
