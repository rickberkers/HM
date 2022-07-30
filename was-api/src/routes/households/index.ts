import { FastifyPluginAsync } from "fastify"
import { getHouseholdParams, getHouseholdSchema } from "./schemas";

const households: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken, fastify.authorizeHouseholdMember], {relation: "and"}));

  fastify.get<{ Params: getHouseholdParams}>('/:id', {
    schema: getHouseholdSchema
  }, async (request, reply) => {
      const result = await fastify.services.householdService.getHousehold(request.params.id);
      if (!result) {
        throw fastify.httpErrors.notFound();
      }
      return result;
  });
  
};

export default households;