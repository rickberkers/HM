import { uuid } from "@schemas/properties";
import { FromSchema } from "json-schema-to-ts";

export const getHouseholdSchema = {
    params: {
        type: 'object',
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: uuid
        },
    }
} as const;

export type getHouseholdParams = FromSchema<typeof getHouseholdSchema.params>;