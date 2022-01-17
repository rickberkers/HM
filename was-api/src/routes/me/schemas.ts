import { FromSchema } from "json-schema-to-ts";

export const getTokenSchema = {
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

export const registerUserSchema = {
    body: {
        type: 'object',
        required: ["id", "name", "password"],
        additionalProperties: false,
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
            },
            name: { type: 'string', },
            firstName: { type: 'string', },
            lastName: { type: 'string', },
            password: {
                type: 'string',
                minLength: 8,
                maxLength: 128,
                pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,128}$'
                /** 
                 *  At least one upper case English letter, (?=.*?[A-Z])
                 *  At least one lower case English letter, (?=.*?[a-z])
                 *  At least one digit, (?=.*?[0-9])
                 *  At least one special character, (?=.*?[#?!@$%^&*-])
                 *  Minimum eight in length .{8,128} (with the anchors)
                 *  Maximum 128 in length .{8,128} (with the anchors)
                 */
            }
        },
    }
} as const;

// me
export type postRegisterBody = FromSchema<typeof registerUserSchema.body>;

// me/token
export type getTokenBody = FromSchema<typeof getTokenSchema.body>;