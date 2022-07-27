export const uuid = {
    type: 'string',
    format: 'uuid',
} as const;

export const ISODate = {
    type: 'string',
    pattern: `^\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$`,
    errorMessage: {
        pattern: "is not formatted as a valid ISO-8601 date"
    }
} as const;