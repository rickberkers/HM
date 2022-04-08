export class UnauthorizedError extends Error {
    constructor() {
        super("User was not authorized");
    }
}

export class UnknownError extends Error {
    constructor() {
        super("Something went wrong");
    }
}

export enum ErrorTypes {
    UNKNOWN,
    UNAUTHORIZED,
    
}