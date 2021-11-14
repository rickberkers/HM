import { FromSchema } from "json-schema-to-ts";

export const getDaysSchema = {
    querystring: {
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
    }
} as const;

export type getDaysQueryString = FromSchema<typeof getDaysSchema.querystring>;