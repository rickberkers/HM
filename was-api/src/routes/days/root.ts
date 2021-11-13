import { isValid, parseISO } from "date-fns";
import { FastifyPluginAsync } from "fastify"
import { FromSchema } from "json-schema-to-ts"

const days: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{ Querystring: QueryStringType }>('/', {
    schema: {
      querystring,
    }
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

const querystring = {
  type: 'object',
  required: ["householdId", "startDate", "limit"],
  additionalProperties: false,
  properties: {
    householdId: {
      type: 'string',
      format: 'uuid',
    },
    startDate: {
      type: 'string',
      pattern: "^\\d{4}\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
    },
    limit: {
      type: 'number',
      minimum: 0,
      maximum: 50,
      nullable: true,
      default: 20,
    }
  },
} as const;
type QueryStringType = FromSchema<typeof querystring>;

export default days;
