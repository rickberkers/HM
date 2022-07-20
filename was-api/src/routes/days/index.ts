import { parseISODateNoTime } from "@utils/date";
import { isValid } from "date-fns";
import { FastifyPluginAsync } from "fastify"
import { getDaysSchema, getDaysQueryString, getDayQueryString, getDayParams, getDaySchema } from "./schemas";

const days: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken]));

  fastify.get<{ Querystring: getDayQueryString, Params: getDayParams }>('/:date', {
    schema: getDaySchema,
  }, async (request, reply) => {

    // Validates & parses date
    const parsedDate = parseISODateNoTime(request.params.date);
    if (!isValid(parsedDate)) {
      throw fastify.httpErrors.badRequest("date is not formatted as a valid ISO-8601 date")
    }

    const result = await fastify.services.dayService.getDayByDateAndHouseholdId(
      parsedDate,
      request.query.householdId, 
    );

    return result 
  });

  fastify.get<{ Querystring: getDaysQueryString }>('/', {
    schema: getDaysSchema,
  }, async (request, reply) => {

    // Validates & parses date
    const parsedDate = parseISODateNoTime(request.query.startDate);
    if (!isValid(parsedDate)) {
      throw fastify.httpErrors.badRequest("startDate is not formatted as a valid ISO-8601 date")
    }

    return await fastify.services.dayService.getDaysByDateAndHouseholdId(
      parsedDate, 
      request.query.householdId, 
      request.query.limit
    );
  });
};

export default days;