import { isValid, parseISO } from "date-fns";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { getDaysSchema, getDaysQueryString } from "./schemas";

const days: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.addHook('preValidation', fastify.auth([fastify.verifyToken]));
  fastify.get<{ Querystring: getDaysQueryString }>('/', {
    schema: getDaysSchema,
  }, async (request, reply) => {

    // Validates & parses date
    const parsedDate = parseISO(request.query.startDate);
    if (!isValid(parsedDate)) {
      throw fastify.httpErrors.badRequest("querystring.startDate is not formatted as a valid ISO-8601 date")
    }

    return await fastify.services.dayService.getDaysByDateAndHouseholdId(
      parsedDate, 
      request.query.householdId, 
      request.query.limit
    );
  });
};

export default days;