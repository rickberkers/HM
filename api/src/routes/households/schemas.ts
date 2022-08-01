import { uuid } from "@schemas/properties";
import { FromSchema } from "json-schema-to-ts";

export const getHouseholdSchema = {
    params: {
        type: 'object',
        required: ["householdId"],
        additionalProperties: false,
        properties: {
          householdId: uuid
        },
    }
} as const;

export type getHouseholdParams = FromSchema<typeof getHouseholdSchema.params>;