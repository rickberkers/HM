import { FromSchema } from "json-schema-to-ts";

export const LoginSchema = {
    body: {
        type: 'object',
        required: ["name", "password"],
        additionalProperties: false,
        properties: {
            name: {
                type: 'string',
            },
            password: { 
                type: 'string',
            }
        },
    }
} as const;

export type LoginBody = FromSchema<typeof LoginSchema.body>;