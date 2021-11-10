import { FastifyPluginAsync } from "fastify"

const households: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {

    const days = await fastify.services.dayService.getDaysByDateAndHouseholdId(
      new Date("2021-11-04"), 
      "d3b6d118-05af-4eaf-8631-0500fe54c683", 
      20
    );

    return days;
  });
};

export default households;
