import { isValid, parseISO } from "date-fns";
import { FastifyPluginAsync } from "fastify"
import { getDaysSchema, getDaysQueryString } from "./schemas";

const days: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{ Querystring: getDaysQueryString }>('/', {
    schema: getDaysSchema
  }, async (request, reply) => {

    // Validate & parse date
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