export class UnauthenticatedError extends Error {
    constructor() {
        super("User was not authenticated");
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super("User was not authorized");
    }
}

export class ServerError extends Error {
    constructor() {
        super("Internal server error");
    }
}

export class NetworkError extends Error {
    constructor() {
        super("Server could not be reached");
    }
}

export class UnknownError extends Error {
    constructor() {
        super("Something went wrong");
    }
}
