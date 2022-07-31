import fp from 'fastify-plugin'

/**
 * This plugins adds a custom global error handler
 */
export default fp(async (fastify, opts) => {

    // Custom error handler to prevent leaking internal details in error messages
    fastify.setErrorHandler((error, request, reply) => {

        if (!error.statusCode || !error.validation) {
            return reply.send(fastify.httpErrors.internalServerError());
        }

        reply.send(error);
    });

})
