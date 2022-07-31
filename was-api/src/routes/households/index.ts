import { FastifyPluginAsync } from "fastify"
import { getHouseholdParams, getHouseholdSchema } from "./schemas";

const households: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken]));
  fastify.addHook('preHandler', fastify.auth([fastify.authorizeHouseholdMember]));

  fastify.get<{ Params: getHouseholdParams}>('/:householdId', {
    schema: getHouseholdSchema
  }, async (request, reply) => {
         
      const result = await fastify.services.householdService.getHousehold(request.params.householdId);
      if (!result) {
        throw fastify.httpErrors.notFound();
      }
      return result;
  });
  
};

export default households;