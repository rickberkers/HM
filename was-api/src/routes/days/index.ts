import { parseISODateNoTime } from "@utils/date";
import { FastifyPluginAsync } from "fastify"
import { getDaysSchema, getDaysQueryString, getDayQueryString, getDayParams, getDaySchema } from "./schemas";

const days: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken, fastify.authorizeHouseholdMember], {relation: "and"}));

  fastify.get<{ Querystring: getDayQueryString, Params: getDayParams }>('/:date', {
    schema: getDaySchema,
  }, async (request, reply) => {

    return await fastify.services.dayService.getDayByDateAndHouseholdId(
      parseISODateNoTime(request.params.date),
      request.query.householdId, 
    );
  });

  fastify.get<{ Querystring: getDaysQueryString }>('/', {
    schema: getDaysSchema,
  }, async (request, reply) => {

    return await fastify.services.dayService.getDaysByDateAndHouseholdId(
      parseISODateNoTime(request.query.startDate),
      request.query.householdId, 
      request.query.limit ?? undefined
    );
  });
};

export default days;