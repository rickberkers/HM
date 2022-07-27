import { FastifySchema } from "fastify/types/schema";
import { FromSchema } from "json-schema-to-ts";
import { ISODate, uuid } from "@schemas/properties";

const householdQueryString = {
  type: 'object',
  required: ["householdId"],
  additionalProperties: false,
  properties: {
    householdId: uuid,
  }
} as const;

const dateParam = {
  type: 'object',
  required: ["date"],
  additionalProperties: false,
  properties: {
    date: ISODate,
  },
} as const;

const guestsBody = {
  type: 'object',
  required: ["guests"],
  additionalProperties: false,
  properties: {
      guests: {
          type: 'array',
          minItems: 1,
          maxItems: 20,
          items: {
              type: 'string',
              minLength: 1,
              maxLength: 32,
          }
      },
  },
} as const;

const committedBody = {
    type: 'object',
    required: ["committed"],
    additionalProperties: false,
    properties: {
        committed: {
            type: 'boolean',
        },
    },
} as const;

export const UpdateCommitmentSchema: FastifySchema = {
    params: dateParam,
    querystring: householdQueryString,
    body: committedBody
};

export const AddCommitmentGuestsSchema: FastifySchema = {
    body: guestsBody,
    querystring: householdQueryString,
    params: dateParam
};

export const RemoveCommitmentGuestsSchema: FastifySchema = {
    body: guestsBody,
    querystring: householdQueryString,
    params: dateParam
};

export type UpdateCommitmentBody = FromSchema<typeof committedBody>;
export type UpdateCommitmentParams = FromSchema<typeof dateParam>;
export type UpdateCommitmentQueryString = FromSchema<typeof householdQueryString>;

export type AddCommitmentGuestsBody = FromSchema<typeof guestsBody>;
export type AddCommitmentGuestsParams = FromSchema<typeof dateParam>;
export type AddCommitmentGuestsQueryString = FromSchema<typeof householdQueryString>;

export type RemoveCommitmentGuestsBody = FromSchema<typeof guestsBody>;
export type RemoveCommitmentGuestsParams = FromSchema<typeof dateParam>;
export type RemoveCommitmentGuestsQueryString = FromSchema<typeof householdQueryString>;