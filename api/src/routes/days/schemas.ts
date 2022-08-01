import { ISODate, uuid } from "@schemas/properties";
import { FromSchema } from "json-schema-to-ts";

export const getDaysSchema = {
    querystring: {
        type: 'object',
        required: ["householdId", "startDate", "limit"],
        additionalProperties: false,
        properties: {
          householdId: uuid,
          startDate: ISODate,
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

export const getDaySchema = {
  querystring: {
      type: 'object',
      required: ["householdId"],
      additionalProperties: false,
      properties: {
        householdId: uuid
      },
  },
  params: {
    type: 'object',
    required: ["date"],
    additionalProperties: false,
    properties: {
      date: ISODate
    },
  }
} as const;

export type getDayParams = FromSchema<typeof getDaySchema.params>;
export type getDayQueryString = FromSchema<typeof getDaySchema.querystring>;

export type getDaysQueryString = FromSchema<typeof getDaysSchema.querystring>;